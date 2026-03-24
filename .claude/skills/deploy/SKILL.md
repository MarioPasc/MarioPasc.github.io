---
name: deploy
description: Commit, push to GitHub, wait for GitHub Pages deploy, and verify the production site. Use this skill when the user says "deploy", "push", "ship it", "go live", "publish", or when the agentic workflow reaches the push step. This skill handles the complete deploy-and-verify cycle — never push and walk away without verifying production.
---

Push the current changes to GitHub, wait for the Pages deploy, and verify the live site.

## Pre-flight checks

Before deploying, ensure:

1. **Build passes locally**:
   ```bash
   cd /home/mpascual/misc/MarioPasc.github.io && bundle exec jekyll build 2>&1
   ```
   If the build fails, stop and fix errors first.

2. **No unintended changes** — review the diff:
   ```bash
   git status
   git diff --stat
   ```
   Summarise what will be deployed. If there are untracked files that should not be committed, ask the user.

3. **Visual verification passed** — the `verify` skill should have been run. If not, run it now.

## Deploy

1. **Stage and commit**:
   ```bash
   git add -A
   git commit -m "<type>: <description>"
   ```
   Follow the commit conventions from CLAUDE.md: `feat:`, `fix:`, `style:`, `content:`, `refactor:`, `docs:`, `chore:`.
   Write a descriptive message. If multiple changes, use a multi-line commit body.

2. **Push**:
   ```bash
   git push origin main
   ```

3. **Wait for deploy** — GitHub Pages takes 30–90 seconds:
   ```bash
   sleep 60
   ```
   Then check deploy status:
   ```bash
   curl -s https://api.github.com/repos/MarioPasc/MarioPasc.github.io/pages/builds | head -20
   ```
   Alternatively, use the **GitHub MCP** to check the deploy status if available. Look for `"status": "built"` in the most recent build.

   If the deploy failed, check the error message and report it.

## Production Verification

Once the deploy succeeds, use the **Playwright MCP** to verify the live site:

1. Navigate to `https://mariopasc.github.io/` (homepage)
2. Navigate to the specific page(s) that changed
3. Take screenshots at desktop (1440×900) viewport
4. Compare against the local preview — look for:
   - Differences in font rendering (remote theme may override local)
   - Missing assets (paths that work locally but break on Pages)
   - HTTPS mixed-content warnings
   - MathJax loading (CDN may be slower than local)

## Report

Summarise:
- Commit hash and message
- Deploy status (success / failure)
- Production screenshots: match local preview? Any discrepancies?
- Final status: **deployed and verified** or **needs attention**
