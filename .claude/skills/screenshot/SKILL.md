---
name: screenshot
description: Take screenshots of the site at multiple viewports using Playwright MCP. Use when the user says "screenshot", "show me how it looks", "check the layout", "visual QA", "how does it render", "take a picture of the site", or when you need to visually inspect any page during the agentic workflow. Also use proactively after any visual change.
---

Take screenshots of a page at multiple viewports using the Playwright MCP server.

## Usage

`/screenshot [url-or-path]`

- If `$ARGUMENTS` is a full URL (starts with `http`), use it directly.
- If `$ARGUMENTS` is a path (e.g., `/blog/my-post/`), prepend `http://localhost:4000`.
- If `$ARGUMENTS` is empty, screenshot the homepage (`http://localhost:4000/`).

## Prerequisites

The local server must be running if targeting `localhost`. If it is not running, start it using the `serve` skill first.

## Steps

1. **Ensure server is live** (if targeting localhost):
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/ | grep -q "200"
   ```

2. **Screenshot at three viewports** using the Playwright MCP:

   | Viewport | Width × Height | Rationale |
   |----------|---------------|-----------|
   | Mobile | 375 × 812 | iPhone 13/14 standard |
   | Tablet | 768 × 1024 | iPad portrait |
   | Desktop | 1440 × 900 | Standard laptop |

   For each viewport:
   - Resize the browser via `browser_resize`
   - Navigate to the target URL via `browser_navigate`
   - Wait 2 seconds for MathJax / fonts / images to load
   - Take a screenshot via `browser_take_screenshot`

3. **Dark mode** (optional, if requested or if the change touches colours):
   - Use Chrome DevTools MCP or Playwright to emulate `prefers-color-scheme: dark`
   - Repeat the screenshot at desktop viewport

4. **Report** — For each screenshot, note:
   - Viewport name and dimensions
   - Any visible issues (overflow, misalignment, broken images, rendering artefacts)
   - Overall assessment: looks good / needs fixes

## Targeting production

To screenshot the live site instead of localhost, use:
```
/screenshot https://mariopasc.github.io/blog/my-post/
```

This is useful after deploying to verify the production result matches local preview.
