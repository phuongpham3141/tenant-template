# Security Incident Response

## Categories
1. **Data breach** (PII / payment / credentials exposed) → P0
2. **Account takeover** (suspected) → P1
3. **Vulnerability disclosure** → P2
4. **Suspicious activity** (alert) → P2

## Steps (P0/P1)
1. **Contain** within 1 hour:
   - Revoke compromised credentials (`auth.session` revoke, rotate API keys, force password reset)
   - Block IPs at edge (Caddy → CrowdSec)
   - Disable affected user (`identity.user.status = 'suspended'`)
2. **Preserve evidence**: snapshot audit log, login history, payment activity to read-only S3.
3. **Notify**:
   - DPO within 24h of awareness (regulatory requirement for personal data)
   - Customers within 72h if breach confirmed (GDPR Art 33-34)
   - Insurer + counsel before any external statement
4. **Eradicate**: patch vulnerability, rotate ALL secrets in affected blast radius.
5. **Recover**: re-enable affected services after verification, monitor closely 7 days.
6. **Postmortem**: blameless RCA within 7 days, include timeline and IOCs.

## Key contacts
- DPO: dpo@huayuesc.vn
- Security team Slack: `#csr-security` (private)
- Insurer: see secrets vault `incident_response_contacts`
- Anthropic/OpenAI abuse: if AI is misused (prompt injection escalation)

## Prevention controls
- Break-glass access logged in `rbac.break_glass_access`
- All admin actions audited in `audit.audit_event`
- Anomaly detection in `auth.security_event_log`
- Daily review of `fraud.fraud_score_log` for high-risk patterns
