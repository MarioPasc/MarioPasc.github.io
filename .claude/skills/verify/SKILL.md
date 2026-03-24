---
name: verify
description: Build the Jekyll site and visually verify it for errors. Use this skill after making any change to HTML, SCSS, Liquid, JS, or content files. Also use when the user asks to "check", "test", "verify", "QA", or "validate" the site. This skill performs both a build check AND a visual inspection with Playwright.
---

Run a full site build, then visually inspect the result with Playwright.

## Phase 1: Build Check

```bash
cd /home/mpascual/misc/MarioPasc.github.io && bundle exec jekyll build 2>&1
```

Check the output for:
- **Build errors**: missing layouts, Liquid syntax errors, YAML frontmatter issues, broken includes
- **Warnings**: deprecated features, missing metadata, empty collections
- **Exit code**: non-zero means the build failed — fix errors before proceeding

If the build fails, report the errors, suggest fixes, and stop. Do not proceed to visual verification.

## Phase 2: Visual Inspection

If the build succeeded, ensure the local server is running (use the `serve` skill if needed), then use the **Playwright MCP** to inspect the pages that were changed.

### Viewports to test

| Name | Width × Height |
|------|---------------|
| Mobile | 375 × 812 |
| Tablet | 768 × 1024 |
| Desktop | 1440 × 900 |

### Inspection checklist

For each affected page, at each viewport:

1. **Navigate** to the page on `http://localhost:4000/<path>`
2. **Take a screenshot** via `browser_take_screenshot`
3. **Check for**:
   - Text overflow or horizontal scrolling
   - Overlapping or misaligned elements
   - Missing images or broken asset paths
   - Navigation menu rendering correctly (especially mobile hamburger)
   - MathJax equations rendering (if the page uses LaTeX)
   - Dark mode consistency (if the change touches colours/backgrounds): toggle the `prefers-color-scheme` and screenshot again
4. **Take a snapshot** via `browser_snapshot` to read the accessibility tree — check for missing alt text, broken aria labels, empty links

### Which pages to check

- If the change is in `_sass/`, `_includes/`, or `_layouts/` → check the homepage, one blog post, and one research page (broad impact)
- If the change is in `content/_blog/` → check only the affected blog post + the blog listing page
- If the change is in `content/_research/` → check only the affected research page + the research listing
- If the change is in `_config.yml` or `_data/` → check all top-level pages (homepage, blog listing, research listing)

## Phase 3: Report

Summarise findings clearly:
- **Build**: passed/failed + any warnings
- **Visual**: for each viewport, note any issues found or confirm it looks correct
- **Recommendation**: "ready to push" or "needs fixes" with specific action items
