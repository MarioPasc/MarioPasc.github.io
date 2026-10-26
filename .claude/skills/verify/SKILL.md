---
name: verify
description: Build the Jekyll site and visually verify it for errors. Use this skill after making any change to HTML, CSS, Liquid, data or content files. Also use when the user asks to "check", "test", "verify", "QA", or "validate" the site. This skill performs both a build check AND a visual inspection with Playwright.
---

Run a full site build, then visually inspect the result with Playwright.

## Phase 1: Build Check

```bash
cd "$(git rev-parse --show-toplevel)"
if [ -d "$HOME/.rbenv" ]; then export PATH="$HOME/.rbenv/bin:$PATH"; eval "$(rbenv init - bash)"; fi
bundle exec jekyll build 2>&1
npm run lint --silent 2>&1 || true   # Stylelint, if node_modules is installed
```

Check for build errors (missing layouts, Liquid syntax, YAML issues) and lint errors in `assets/css/main.css`. If the build fails, report errors and stop.

Production uses the GitHub Pages builder (Jekyll 3.10, Liquid 4). Flag any Liquid filter, tag or plugin that Jekyll 3.10 lacks.

## Phase 2: Visual Inspection

Ensure the local server is running (use `/serve` if needed), then use **Playwright MCP** to inspect changed pages.

### Viewports to test

| Name | Width x Height |
|------|---------------|
| Mobile | 375 x 812 |
| Tablet | 768 x 1024 |
| Desktop | 1440 x 900 |

### Inspection checklist

For each affected page, at each viewport:

1. Navigate to `http://127.0.0.1:4000/<path>`
2. Take a screenshot via `browser_take_screenshot`
3. Check for: text overflow, overlapping elements, missing images, nav rendering, MathJax equations (pages with `math: true`)
4. No horizontal scroll at mobile width, with every BibTeX `<details>` opened:
   `browser_evaluate` → `document.querySelectorAll('details').forEach(d => d.open = true); document.documentElement.scrollWidth <= document.documentElement.clientWidth`
5. If the change touches colours: click `.theme-toggle`, screenshot again, then click it back to light (the choice persists in `localStorage`)

### Which pages to check

- Changes in `assets/css/`, `_includes/`, or `_layouts/` → check home, publications, CV, and a blog post
- Changes in `content/_blog/` → check the affected post + blog listing
- Changes in `_data/publications.yml` → check publications and home
- Changes in `_data/cv.yml`, `news.yml`, `profile.yml` or `_config.yml` → check all top-level pages

## Phase 3: Report

Summarise:
- **Build**: passed/failed + warnings
- **Lint**: clean or findings
- **Visual**: any issues per viewport, or confirm correct
- **Recommendation**: "ready to push" or "needs fixes" with specifics
