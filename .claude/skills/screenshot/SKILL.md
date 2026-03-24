---
name: screenshot
description: Take screenshots of the site at multiple viewports using Playwright MCP. Use when the user says "screenshot", "show me how it looks", "check the layout", "visual QA", "how does it render", "take a picture of the site", or when you need to visually inspect any page during the agentic workflow. Also use proactively after any visual change.
---

Take screenshots of a page at multiple viewports using the Playwright MCP server.

## Usage

`/screenshot [url-or-path]`

- Full URL (starts with `http`) → use directly
- Path (e.g., `/blog/my-post/`) → prepend `http://127.0.0.1:4000`
- Empty → screenshot homepage (`http://127.0.0.1:4000/`)

## Prerequisites

The local server must be running. If not, start it with `/serve` first.

## Steps

1. **Ensure server is live**:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4000/
   ```

2. **Screenshot at three viewports** using Playwright MCP:

   | Viewport | Width x Height |
   |----------|---------------|
   | Mobile | 375 x 812 |
   | Tablet | 768 x 1024 |
   | Desktop | 1440 x 900 |

   For each viewport:
   - `browser_resize` to set dimensions
   - `browser_navigate` to the target URL
   - `browser_take_screenshot` (full page)

3. **Dark mode** (if requested or if the change touches colours):
   - Click the theme toggle button to switch modes
   - Screenshot at desktop viewport

4. **Report** — For each screenshot, note viewport, any issues, and overall assessment.

## Production screenshots

To screenshot the live site:
```
/screenshot https://mariopasc.github.io/blog/my-post/
```
