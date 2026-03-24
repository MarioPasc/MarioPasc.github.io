# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Jekyll-based personal portfolio and research blog for a biomedical-imaging researcher. Hosted on GitHub Pages at `https://mariopasc.github.io/`. The site has two content collections (blog and research), uses a remote theme, and supports LaTeX rendering via MathJax.

## Available Tech Stack

You have the following tools available. Use them proactively — do not ask for permission before using tools you already have access to.

### Runtime & Build

| Tool | Purpose | Check |
|------|---------|-------|
| **Ruby 3.3** (via rbenv) | Jekyll runtime | `ruby -v` |
| **Bundler** | Gem dependency management | `bundler -v` |
| **Jekyll 4.3** | Static site generator | `bundle exec jekyll -v` |
| **Node.js 22+** (via nvm) | MCP servers, npm packages | `node -v` |
| **Git** | Version control, push to GitHub | `git --version` |
| **Python 3** | Auxiliary scripting if needed | `python3 --version` |

### MCP Servers

You have three MCP servers registered. Use them as part of your workflow — they are your eyes and hands.

| Server | Transport | Tools | When to use |
|--------|-----------|-------|-------------|
| **playwright** | stdio | `browser_navigate`, `browser_take_screenshot`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_resize` | Preview the site visually, take screenshots at different viewports, verify layout changes |
| **github** | HTTP | Push, PR creation, deploy status, issue management | Push commits, check if GitHub Pages deploy succeeded, create PRs |
| **chrome-devtools** | stdio | CSS inspection, console logs, network requests, performance traces | Debug CSS issues, check computed styles, diagnose rendering problems |

### Shell Utilities

You have permission to use: `bundle`, `ruby`, `gem`, `git`, `ls`, `cat`, `head`, `tail`, `wc`, `mkdir`, `cp`, `mv`, `touch`, `echo`, `curl`, `wget`, `npm`, `npx`, `node`, `python3`, `jq`, `sed`, `awk`, `sort`, `uniq`, `diff`, `grep`, `rg`, `find`, `xargs`, `tee`, `lsof`, `gh`.

**Denied** (safety): `git push --force`, `git reset --hard`, `rm -rf`, `sudo`, `chmod`, `chown`, `kill`/`killall`/`pkill`, `shutdown`, `reboot`, `dd`.

## Development Commands

```bash
# Install dependencies (run once after clone or Gemfile changes)
bundle install

# Local development server (serves at http://localhost:4000)
bundle exec jekyll serve --livereload

# Build only (output to _site/)
bundle exec jekyll build

# Check for port conflicts
lsof -i :4000
```

## Architecture

```
MarioPasc.github.io/
├── _config.yml              # Site config: theme, collections, plugins, defaults
├── _data/
│   ├── navigation.yml       # Nav menu structure
│   └── tags.yml             # Tag definitions for blog posts
├── _includes/               # Liquid partials (header, footer, etc.)
├── _layouts/                # Page layouts (post, default)
├── _sass/
│   └── base/
│       └── _variables.scss  # Design tokens: colours, spacing, fonts
├── assets/
│   ├── css/                 # Compiled SCSS output
│   ├── js/                  # Vanilla ES6+ scripts
│   └── images/              # Static images
├── content/
│   ├── _blog/               # Blog posts (collection)
│   └── _research/           # Research project pages (collection)
├── blog/                    # Blog listing page
├── Gemfile                  # Ruby dependencies
├── .claude/                 # Claude Code config, skills, settings
│   ├── settings.json        # Shared permissions (committed)
│   ├── settings.local.json  # Local-only permissions (gitignored)
│   └── skills/              # Custom slash-command skills
└── CLAUDE.md                # This file
```

### Key Config

- **Theme**: `thundergolfer/junior-theme` (GitHub-hosted remote theme via `jekyll-remote-theme`)
- **Collections**: `blog` → `content/_blog/`, `research` → `content/_research/`
- **Plugins**: `jekyll-remote-theme`, `jekyll-paginate`, `jekyll-sitemap`
- **Markdown**: kramdown with GFM input
- **Sass**: compressed output, source in `_sass/`

## Content Conventions

### Blog posts (`content/_blog/`)

```yaml
---
title: "Post Title"
date: YYYY-MM-DD
layout: post
tag: tag-name        # must exist in _data/tags.yml or be added there
---
```

### Research pages (`content/_research/`)

```yaml
---
title: "Project Title"
date: YYYY-MM-DD
layout: post          # or layout: default
scripts:              # optional, for page-specific JS
  - /assets/js/my-script.js
---
```

### Math rendering

MathJax is enabled globally. Use `$$...$$` for display math and `\\(...\\)` for inline math. Test rendering locally before pushing.

### Tags

Existing tags are defined in `_data/tags.yml`. Current tags include: `esp32`, `personal`. When creating content, prefer existing tags; if a new tag is needed, add it to `_data/tags.yml` first.

## Style & Code Guidelines

### HTML/Liquid

- Use semantic HTML5 (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`)
- Include accessibility attributes (`aria-label`, `aria-current`, `role`)
- Liquid templates: use `{% include %}` for reusable partials

### SCSS

- **Always use existing variables** from `_sass/base/_variables.scss` for colours, spacing, fonts
- Support dark mode via CSS custom properties — test both themes when adding visual elements
- Keep selectors flat and specific; avoid deep nesting (max 3 levels)
- Output is compressed — write clean, well-commented source

### JavaScript

- Vanilla ES6+ only — no frameworks, no jQuery, no build step
- Scripts go in `assets/js/` and are included via `scripts:` frontmatter

## Agentic Workflow

When making any visual or structural change, follow this loop. Do not skip steps.

### The Loop: Edit → Preview → Inspect → Fix → Push → Verify

1. **Edit** — Make the code change (SCSS, HTML, Liquid, JS, content).

2. **Local build check** — Run `bundle exec jekyll build 2>&1` and check for errors. Fix any build failures before proceeding.

3. **Start local server** — Run `bundle exec jekyll serve` in the background if not already running. Verify it is listening on `localhost:4000`.

4. **Visual inspection with Playwright** — Use the Playwright MCP to:
   - Navigate to the relevant page on `http://localhost:4000`
   - Take screenshots at **three viewports**: mobile (375×812), tablet (768×1024), desktop (1440×900)
   - If the change involves dark mode, toggle the colour scheme and screenshot again
   - Check for layout breakage, overflow, misaligned elements, missing content

5. **Fix issues** — If any visual problems are found, fix them and repeat from step 2.

6. **Commit and push** — Stage changes with `git add -A`, write a descriptive commit message following conventional style (`feat:`, `fix:`, `style:`, `content:`, `refactor:`), and push to `main`.

7. **Wait for deploy** — GitHub Pages typically deploys in 30–90 seconds. Wait 60 seconds, then check deploy status via the GitHub MCP or by polling `https://api.github.com/repos/MarioPasc/MarioPasc.github.io/pages/builds`.

8. **Production verification** — Use Playwright to navigate to `https://mariopasc.github.io/<path>` and take a final screenshot. Compare against the local preview. If discrepancies exist, diagnose and fix.

### When to use Chrome DevTools MCP

Use the Chrome DevTools MCP server (not Playwright) when you need to:
- Inspect computed CSS values on a specific element
- Check the browser console for JavaScript errors
- Analyse network requests (e.g., MathJax CDN loading, font files)
- Record a performance trace to diagnose slow page loads

### Commit Conventions

```
<type>: <short description>

<optional body explaining why>
```

Types: `feat`, `fix`, `style`, `content`, `refactor`, `docs`, `chore`

Examples:
- `content: add new blog post on diffusion models`
- `style: fix mobile nav overflow on research listing`
- `feat: add citation copy button to research pages`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `jekyll serve` fails with address in use | `lsof -i :4000` then stop the conflicting process |
| Remote theme not loading locally | Run `bundle install` — `jekyll-remote-theme` gem must be present |
| MathJax not rendering | Check that `enable_mathjax: true` is in `_config.yml`; use `$$` delimiters, not `$` |
| Playwright screenshot is blank | Server may not be ready; wait 2 seconds after `jekyll serve` before navigating |
| Git push rejected | Pull first: `git pull --rebase origin main` |
| SCSS changes not visible | Jekyll caches compiled CSS; restart the server or `rm -r _site/` and rebuild |
