# AI Livestream Operations Runbook

## Architecture quick reference
- **Schema**: 14 tables in `live.*` (persona, voice_profile, avatar_asset, script, segment, transition, director_session, tts/video render jobs, chat cache, audio_track, schedule, ledger, clip_library) + extended `livestream` columns
- **Workers** (BullMQ): `ai-tts-render`, `ai-video-render`, `ai-director-tick`, `ai-chat-responder`, `ai-mux-feed`
- **Jobs** (cron): `ai-247-scheduler` (1m), `gpu-quota-enforcer` (5m), `clip-library-indexer` (20m), `compute-cost-rollup` (1h)
- **Providers**: ElevenLabs (TTS+clone) / Coqui (fallback), HeyGen + D-ID + Wav2Lip (avatar), OpenAI realtime (chat)

## Cold-start a new AI stream
1. Tenant creates persona via `/seller-center/ai-livestream` → uploads voice samples → ElevenLabs clone (~2 min)
2. Tenant creates script (segments + transitions) via Payload `ai-script-templates` or admin API
3. Tenant calls `POST /admin/ai-livestream/<stream_id>/start` with `{ script_id, persona_id, locales: [vi,en,cn] }`
4. Director session initialized → first segment selected → TTS jobs enqueued (per locale)
5. TTS completes → enqueue video render → completes → enqueue mux-feed
6. Mux worker spawns FFmpeg → HLS playlists at `/<stream_id>/<locale>/playlist.m3u8`
7. Tracks registered in `live.stream_audio_track` → storefront watch page reads them
**Target cold-start (first audio chunk visible to viewer): <15s**

## Quota exceeded
**Symptom**: Stream pauses, sessions transition to `status='quota_paused'`, supplier receives email.

1. Verify in Grafana "Quota consumption per tenant" → confirm tenant_id over limit
2. Check `live.ai_compute_ledger` rollup for the month:
   ```sql
   SELECT resource_type, SUM(total_micros)/1e6 AS usd FROM live.ai_compute_ledger
   WHERE tenant_id = '<id>' AND occurred_at >= date_trunc('month', NOW())
   GROUP BY resource_type ORDER BY usd DESC;
   ```
3. Option A — supplier upgrades plan → cron `gpu-quota-enforcer` will auto-resume next tick
4. Option B — admin grants temporary override:
   ```sql
   UPDATE admin.tenant SET plan_tier = 'enterprise' WHERE id = '<id>';
   UPDATE live.ai_director_session SET status = 'running', paused_at = NULL WHERE tenant_id = '<id>' AND status = 'quota_paused';
   UPDATE live.broadcast_schedule SET paused = FALSE WHERE tenant_id = '<id>' AND pause_reason = 'quota_exceeded';
   ```

## GPU node failover
**Symptom**: `AiVideoRenderBacklog` alert; video render workers OOM or CUDA errors.

1. Cordon failing node: `kubectl cordon <node>`
2. Drain (workers will be rescheduled): `kubectl drain <node> --delete-emptydir-data --ignore-daemonsets`
3. If using HeyGen/D-ID (cloud): no impact other than queue catch-up
4. If using local Wav2Lip: temporarily disable per-tenant via:
   ```sql
   UPDATE live.avatar_asset SET provider = 'heygen' WHERE provider = 'local_wav2lip';
   ```
   (workers re-read avatar.provider each job)
5. Re-cordon when replacement node ready

## Persona voice retraining
1. Supplier uploads new voice samples in Payload `ai-personas` → `voiceSamples`
2. Hook fires → enqueue `voice-clone` job → ElevenLabs API → new `provider_voice_id`
3. Update `live.voice_profile` with new ID, mark `is_clone=TRUE`, `training_status='ready'`
4. Director picks up new voice on next segment automatically (no restart needed)
5. Old voice_profile kept for audit; can be archived after 30 days

## Manual segment skip (during live)
```sql
-- Force director to advance to next segment NOW
UPDATE live.ai_director_session
SET segment_ends_at = NOW() - INTERVAL '1 second'
WHERE id = '<session_id>';
```
The director tick (1s cadence) will detect elapsed segment and pick next.

## Switch viewer experience to human host mid-stream
1. `UPDATE live.livestream SET mode = 'human' WHERE id = '<stream_id>'`
2. `UPDATE live.ai_director_session SET status = 'paused' WHERE stream_id = '<stream_id>'`
3. Storefront watch page detects mode change → swaps to human-host UI within 5s (revalidate window)

## Mux process recovery
If `simulcast-mux` pod restarts mid-stream:
- FIFO file persists on PVC → new pod resumes appending
- HLS playlist regenerates from segment counter (no client disruption beyond ~2-segment glitch)
- If FIFO corrupted: delete `/var/lib/csr/fifo/<stream_id>/*` → mux worker rebuilds on next chunk

## Cost diagnostics (single session)
```sql
SELECT resource_type, provider, SUM(units) AS units, SUM(total_micros)/1e6 AS usd
FROM live.ai_compute_ledger WHERE director_session_id = '<id>'
GROUP BY resource_type, provider ORDER BY usd DESC;
```

## Useful metrics endpoints
- `bullmq_ai_*_waiting` — queue depth per worker
- `ai_director_session{status=...}` — sessions by state
- `stream_audio_track_last_chunk_unix` — track freshness
- `ai_quota_percent_used{tenant_id=...}` — monthly quota

## Escalation
- P0 (mux down, multiple streams): pager → `#csr-oncall`
- P1 (quota anomaly, GPU backlog): Slack `#csr-ai-livestream`
- P2 (single persona training failure): create ticket in `#csr-bugs`
