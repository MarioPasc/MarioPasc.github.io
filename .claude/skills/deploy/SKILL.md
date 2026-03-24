---
name: deploy
description: Commit, push to GitHub, wait for GitHub Pages deploy, and verify the production site. Use this skill when the user says "deploy", "push", "ship it", "go live", "publish", or when the agentic workflow reaches the push step. This skill handles the complete deploy-and-verify cycle — never push and walk away without verifying production.
---

Push the current changes to GitHub, wait for the Pages deploy, and verify the live site.

## Pre-flight checks

1. **Build passes locally**:
   ```bash
   export PATH="$HOME/.rbenv/bin:$PATH" && eval "$(rbenv init - bash)"
   cd /home/mpascual/misc/MarioPasc.github.io && bundle exec jekyll build 2>&1
   ```

2. **Review changes**:
   ```bash
   git status
   git diff --stat
   ```
   Summarise what will be deployed. Ask about untracked files that shouldn't be committed.

3. **Visual verification passed** — run `/verify` if not already done.

## Deploy

1. **Stage and commit**:
   ```bash
   git add -A
   git commit -m "<type>: <description>"
   ```
   Follow commit conventions: `feat:`, `fix:`, `style:`, `content:`, `refactor:`, `docs:`, `chore:`.

2. **Push**:
   ```bash
   git push origin main
   ```

3. **Wait for deploy** (30-90 seconds):
   ```bash
   sleep 60
   curl -s https://api.github.com/repos/MarioPasc/MarioPasc.github.io/pages/builds | head -20
   ```

## Production Verification

Once deployed, use **Playwright MCP** to verify:

1. Navigate to `https://mariopasc.github.io/`
2. Navigate to changed page(s)
3. Take desktop screenshots
4. Check for: missing assets, font differences, HTTPS issues, MathJax loading

## Report

- Commit hash and message
- Deploy status
- Production matches local? Any discrepancies?
- Final: **deployed and verified** or **needs attention**
