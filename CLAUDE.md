# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Jekyll-based personal portfolio and research blog for a biomedical-imaging researcher. Hosted on GitHub Pages at `https://mariopasc.github.io/`. The site has two content collections (blog and research), a data-driven publications system, and supports LaTeX rendering via MathJax.

## Design System

- **Fonts**: Lora (serif, headings) + Source Sans 3 (sans-serif, body) + JetBrains Mono (code)
- **Palette**: Navy primary (`#1a1a2e`), academic gold accent (`#c9a84c`), warm off-white background (`#fafaf5`)
- **Dark mode**: Full palette inversion via CSS custom properties on `[data-theme="dark"]`
- **Layout**: Brand-left / links-right navigation, centered reading columns, card-based content

## Available Tech Stack

### Runtime & Build

| Tool | Purpose | Check |
|------|---------|-------|
| **Ruby 3.3** (via rbenv) | Jekyll runtime | `ruby -v` |
| **Bundler** | Gem dependency management | `bundler -v` |
| **Jekyll 4.3** | Static site generator | `bundle exec jekyll -v` |
| **Node.js 22+** (via nvm) | MCP servers, npm packages | `node -v` |
| **Git** | Version control, push to GitHub | `git --version` |

### MCP Servers

| Server | Tools | When to use |
|--------|-------|-------------|
| **playwright** | `browser_navigate`, `browser_take_screenshot`, `browser_snapshot`, `browser_click`, `browser_resize` | Preview the site visually, take screenshots at different viewports |
| **github** | Push, PR creation, deploy status, issue management | Push commits, check deploy status |
| **chrome-devtools** | CSS inspection, console logs, network requests | Debug CSS issues, check computed styles |

### Shell Utilities

Allowed: `bundle`, `ruby`, `gem`, `git`, `ls`, `cat`, `head`, `tail`, `wc`, `mkdir`, `cp`, `mv`, `touch`, `echo`, `curl`, `wget`, `npm`, `npx`, `node`, `python3`, `jq`, `sed`, `awk`, `sort`, `uniq`, `diff`, `grep`, `rg`, `find`, `xargs`, `tee`, `lsof`, `gh`.

**Denied**: `git push --force`, `git reset --hard`, `rm -rf`, `sudo`, `chmod`, `chown`, `kill`/`killall`/`pkill`, `shutdown`, `reboot`, `dd`.

## Development Commands

```bash
bundle install                          # Install dependencies
bundle exec jekyll serve --livereload   # Local dev server at localhost:4000
bundle exec jekyll build                # Build to _site/
lsof -i :4000                           # Check for port conflicts
npm run lint                            # Run ESLint + Stylelint
```

## Architecture

```
MarioPasc.github.io/
├── index.html                  # Homepage (includes home-content.html)
├── about.md                    # About page (includes about-content.html)
├── blog/index.html             # Blog listing with tag filter
├── _config.yml                 # Site config: collections, plugins, defaults
├── _data/
│   ├── navigation.yml          # Nav menu structure
│   ├── tags.yml                # Tag definitions (esp32, personal)
│   ├── publications.csv        # Publications data (CSV, editable in spreadsheets)
│   └── groups.yml              # Research groups/affiliations metadata
├── _includes/
│   ├── components/
│   │   ├── navigation.html     # Brand-left, links-right nav + hamburger
│   │   └── footer.html         # Social icons, copyright, Claude attribution
│   ├── publications.html       # Reusable pub cards (params: filter, group_id, layout)
│   ├── bibtex-entry.html       # Auto-generates BibTeX from structured fields
│   ├── home-content.html       # Hero + featured publications + recent posts
│   ├── about-content.html      # Bio, images, career
│   └── research-content.html   # Research narrative + dynamic groups + publications
├── _layouts/
│   ├── default.html            # Base layout (fonts, scripts, nav, footer)
│   └── post.html               # Blog post (reading time, tag, author card)
├── _sass/
│   ├── base/
│   │   ├── _variables.scss     # Design tokens: colours, spacing, fonts
│   │   ├── _reset.scss         # CSS reset & accessibility
│   │   └── _typography.scss    # Lora headings, Source Sans body
│   ├── layout/
│   │   └── _main.scss          # Page content container
│   ├── components/
│   │   ├── _navigation.scss    # Sticky nav, hamburger, mobile overlay
│   │   ├── _footer.scss        # Footer, back-to-top, Claude attribution
│   │   ├── _buttons.scss       # Button system
│   │   ├── _blog.scss          # Blog page, tag filter, blog cards
│   │   ├── _post.scss          # Post reading column, author card, MathJax
│   │   ├── _research.scss      # Research sections, publication cards
│   │   ├── _code.scss          # Code blocks, syntax highlighting
│   │   ├── _home.scss          # Hero, home sections
│   │   ├── _about.scss         # About page layout
│   │   └── _animations.scss    # Scroll reveal, hover effects
│   └── utilities/
│       └── _helpers.scss       # Utility classes
├── assets/
│   ├── css/main.scss           # Main entry point (imports all SCSS)
│   ├── js/
│   │   ├── main.js             # Core: dark mode, nav, scroll, citations
│   │   ├── tag-filter.js       # Blog tag filter (client-side)
│   │   └── syntax-highlighter.js
│   └── images/
│       ├── about_me/           # Portrait, judo photos
│       ├── blog/               # Per-post image directories
│       ├── research/           # Lab photos
│       └── claude-color.png    # Claude logo for footer
├── content/                    # Collections directory
│   ├── _blog/                  # Blog posts (markdown)
│   └── _research/              # Research pages
│       └── index.md            # Main research page
├── Gemfile                     # Ruby dependencies
├── package.json                # Node (ESLint, Stylelint)
├── .gitignore
├── CLAUDE.md                   # This file
└── .claude/                    # Claude Code config & skills
    ├── settings.json
    └── skills/                 # Slash-command skills
```

### Key Config

- **Collections**: `blog` → `content/_blog/`, `research` → `content/_research/`
- **Plugins**: `jekyll-paginate`, `jekyll-sitemap`
- **Markdown**: kramdown with GFM input
- **Sass**: compressed output, source in `_sass/`

## Content Conventions

### Blog posts (`content/_blog/`)

```yaml
---
title: "Post Title"
date: YYYY-MM-DD
layout: post
tag: tag-name           # must exist in _data/tags.yml
description: "Preview text for cards (optional, falls back to first 150 chars)"
---
```

### Publications (`_data/publications.csv`)

Add a new row to the CSV — the site rebuilds automatically. Editable in Excel/Google Sheets.

**CSV columns** (24 total):

| Column | Required | Description |
|--------|----------|-------------|
| `id` | Yes | BibTeX key / HTML anchor |
| `type` | Yes | `article`, `preprint`, `inproceedings`, `poster`, `thesis` |
| `title` | Yes | Paper title |
| `authors` | Yes | Comma-separated: `M. Surname, A. Other` (Pascual auto-bolded) |
| `year` | Yes | Publication year |
| `venue` | Yes | Journal/conference name |
| `volume` | No | Journal volume |
| `pages` | No | Page range |
| `doi` | No | DOI identifier |
| `arxiv` | No | arXiv ID (e.g., `2602.03372`) |
| `isbn` | No | ISBN |
| `publisher` | No | Publisher name |
| `address` | No | Publication location |
| `primary_class` | No | arXiv class (e.g., `cs.CV`) |
| `paper_url` | No | Direct PDF link (fallback if no DOI/arXiv) |
| `code_url` | No | GitHub/code repo URL |
| `zenodo_url` | No | Zenodo link |
| `pypi_url` | No | PyPI package |
| `project_url` | No | Project website |
| `quartile` | No | Journal quartile (`Q1`-`Q4`), shown as badge |
| `citations` | No | Citation count |
| `featured` | No | `true` = shown on homepage |
| `group_id` | Yes | Links to `_data/groups.yml` entry |
| `personal_comments` | No | Free text (HTML allowed) |

BibTeX is **auto-generated** from the structured fields — no need to write it manually.

### Research Groups (`_data/groups.yml`)

Each group/affiliation has: `id`, `name`, `institution`, `url`, `period`, `image`, `image_caption`, `sort_order`, `description_html`. The research page renders groups dynamically in `sort_order`.

### Publications include

- `{% include publications.html %}` — all publications
- `{% include publications.html filter="featured" %}` — featured only (homepage)
- `{% include publications.html group_id="icai" layout="grid" %}` — by group, two-column

### Tags

Defined in `_data/tags.yml`. Current: `esp32`, `personal`. Add new tags there before using in posts.

### Math rendering

MathJax is enabled globally. Use `$$...$$` for display math and `\\(...\\)` for inline math.

## Style & Code Guidelines

### HTML/Liquid

- Use semantic HTML5 (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`)
- Include accessibility attributes (`aria-label`, `aria-current`, `role`)

### SCSS

- **Always use existing variables** from `_sass/base/_variables.scss`
- Use `$font-family-heading` (Lora) for headings, `$font-family-base` (Source Sans) for body
- Support dark mode via CSS custom properties — test both themes
- Keep selectors flat; avoid deep nesting (max 3 levels)

### JavaScript

- Vanilla ES6+ only — no frameworks, no jQuery, no build step
- All scripts loaded in `_layouts/default.html` with `defer`

## Agentic Workflow

When making any visual or structural change, follow this loop:

1. **Edit** — Make the code change
2. **Build check** — `bundle exec jekyll build 2>&1`
3. **Start server** — `bundle exec jekyll serve` if not running
4. **Visual inspection** — Playwright screenshots at mobile (375×812), tablet (768×1024), desktop (1440×900). Toggle dark mode if relevant.
5. **Fix issues** — Repeat from step 2
6. **Commit and push** — Conventional commits (`feat:`, `fix:`, `style:`, `content:`, `refactor:`)
7. **Verify deploy** — Check GitHub Pages build status, then screenshot production

### Commit Conventions

Types: `feat`, `fix`, `style`, `content`, `refactor`, `docs`, `chore`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `jekyll serve` fails with address in use | `lsof -i :4000` then stop the process |
| MathJax not rendering | Check `enable_mathjax: true` in `_config.yml`; use `$$` delimiters |
| Playwright screenshot is blank | Wait 2-4 seconds after `jekyll serve` before navigating |
| SCSS changes not visible | Restart server or `rm -r _site/` and rebuild |
