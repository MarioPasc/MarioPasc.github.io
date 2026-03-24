---
name: verify
description: Build the Jekyll site and visually verify it for errors. Use this skill after making any change to HTML, SCSS, Liquid, JS, or content files. Also use when the user asks to "check", "test", "verify", "QA", or "validate" the site. This skill performs both a build check AND a visual inspection with Playwright.
---

Run a full site build, then visually inspect the result with Playwright.

## Phase 1: Build Check

```bash
export PATH="$HOME/.rbenv/bin:$PATH" && eval "$(rbenv init - bash)"
cd /home/mpascual/misc/MarioPasc.github.io && bundle exec jekyll build 2>&1
```

Check for build errors (missing layouts, Liquid syntax, YAML issues). If the build fails, report errors and stop.

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
3. Check for: text overflow, overlapping elements, missing images, nav rendering, MathJax equations
4. If the change touches colours/backgrounds: click the theme toggle to switch dark mode and screenshot again

### Which pages to check

- Changes in `_sass/`, `_includes/`, or `_layouts/` → check homepage, a blog post, and research page
- Changes in `content/_blog/` → check the affected post + blog listing
- Changes in `content/_research/` → check research page
- Changes in `_config.yml` or `_data/` → check all top-level pages

## Phase 3: Report

Summarise:
- **Build**: passed/failed + warnings
- **Visual**: any issues per viewport, or confirm correct
- **Recommendation**: "ready to push" or "needs fixes" with specifics
