# i18n sync — translation memory & delta procedure

The CN (`cn-deepseek`) and EN (`en.huayuesc.vn`) branches are **in-place translations**
of the Vietnamese source branch `giaodien-huayuesc`. Git is the translation memory: the
VN commit each translation was last synced from is the baseline for the next cheap diff.

## Last synced baseline
- **VN base commit:** `5e771e2` ("full giaodien-huayuesc UI work")  ← style/UI rework
- EN translations correspond to this VN base · CN: data/content still on older base, UI synced to `5e771e2`
- Images: served live from VN host `public/` via read-only bind-mount (no copy needed).

## To sync a new VN change (token-cheap — translate ONLY what changed)
```bash
NEWVN=<new vi commit/worktree>      # e.g. latest giaodien-huayuesc
OLDVN=5e771e2                        # the baseline above
# 1. See exactly what changed (clean VN->VN diff, no language noise):
git diff $OLDVN $NEWVN --stat -- storefront/src
# 2. For each changed file, 3-way merge the VN delta onto the translated file
#    (structural/className/layout changes apply automatically; only changed TEXT conflicts):
for f in <changed files>; do
  git show <EN-or-CN-ref>:storefront/src/$f > /tmp/cur
  git show $OLDVN:storefront/src/$f         > /tmp/base
  git show $NEWVN:storefront/src/$f         > /tmp/new
  git merge-file -p /tmp/cur /tmp/base /tmp/new > storefront/src/$f   # conflicts = text to translate
done
# 3. Resolve conflicts: keep structure, translate ONLY the new VN text (EN: Claude, CN: DeepSeek).
# 4. CAUTION: if a component's *exports/imports were refactored* (e.g. mega-menu
#    SubmenuContent API), 3-way merge mixes versions -> take that file from $NEWVN
#    wholesale, then translate. Always rebuild + curl home (must be 200, not 500).
# 5. Update the baseline above to $NEWVN.
```

## Verify (rendered, not comments)
Fetch the page HTML and grep for VN diacritics there — comments never reach HTML.
Glossary lives in `TRANSLATION-BRIEF-EN.md`. Deploy = dev container on :18081 (CN) /
:18082 (EN), `-v .../storefront/public:/app/public:ro` (keep the image mount on every rebuild).
