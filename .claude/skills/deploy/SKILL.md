---
name: deploy
description: Commit, push to GitHub, wait for GitHub Pages deploy, and verify the production site. Use this skill when the user says "deploy", "push", "ship it", "go live", "publish", or when the agentic workflow reaches the push step. This skill handles the complete deploy-and-verify cycle — never push and walk away without verifying production.
---

Push the current changes to GitHub, wait for the Pages deploy, and verify the live site.

## Pre-flight checks

1. **Remote has not moved** (other machines push here too):
   ```bash
   cd "$(git rev-parse --show-toplevel)"
   git fetch origin && git status -sb | head -1
   ```
   If `main` is behind `origin/main`, merge or rebase first and re-run `/verify`.

2. **Citation metrics are fresh**:
   ```bash
   python3 scripts/update_metrics.py
   ```
   A failure leaves `_data/metrics.yml` unchanged; report it and continue.

3. **Build passes locally**:
   ```bash
   if [ -d "$HOME/.rbenv" ]; then export PATH="$HOME/.rbenv/bin:$PATH"; eval "$(rbenv init - bash)"; fi
   bundle exec jekyll build 2>&1
   ```

4. **Review changes**:
   ```bash
   git status
   git diff --stat
   ```
   Summarise what will be deployed. Ask about untracked files that shouldn't be committed.

5. **Visual verification passed** — run `/verify` if not already done.

## Deploy

1. **Stage and commit**:
   ```bash
   git add -A
   git commit -m "<type>: <description>"
   ```
   Follow commit conventions: `feat:`, `fix:`, `style:`, `content:`, `refactor:`, `docs:`, `chore:`.

2. **Push** (HTTPS needs stored credentials; SSH works without them):
   ```bash
   git push origin main || git push git@github.com:MarioPasc/MarioPasc.github.io.git main
   ```

3. **Wait for deploy** (30-90 seconds), then check the latest Pages run:
   ```bash
   sleep 60
   curl -s "https://api.github.com/repos/MarioPasc/MarioPasc.github.io/actions/runs?per_page=1" \
     | jq -r '.workflow_runs[0] | "\(.name) \(.head_sha[0:7]) \(.status) \(.conclusion)"'
   ```
   The SHA must match the pushed commit and the conclusion must be `success`.

## Production Verification

Once deployed, use **Playwright MCP** to verify:

1. Navigate to `https://mariopasc.github.io/`
2. Navigate to changed page(s)
3. Take desktop screenshots
4. Check for: missing assets, font not loading (Source Serif 4), HTTPS issues, MathJax on pages with `math: true`

## Report

- Commit hash and message
- Deploy status
- Production matches local? Any discrepancies?
- Final: **deployed and verified** or **needs attention**
