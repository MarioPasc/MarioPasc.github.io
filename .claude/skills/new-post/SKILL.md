---
name: new-post
description: Scaffold a new blog post with correct frontmatter and file path. Use when the user says "new post", "write a post", "create a blog entry", "blog about", or any request to add content to the blog. Usage /new-post <title>
---

Create a new blog post in the `content/_blog/` directory.

Use `$ARGUMENTS` as the post title. If no arguments provided, ask the user for a title.

## Steps

1. **Generate a slug** from the title: lowercase, hyphens for spaces, strip special characters, max 60 chars.
   Example: `"My Thoughts on Flow Matching"` → `my-thoughts-on-flow-matching`

2. **Create the file** at `content/_blog/<slug>.md`:

```yaml
---
title: "<Title>"
date: <today's date YYYY-MM-DD>
tag: <short free-text label, optional>
description: "<1-2 sentences; used as the page's meta description>"
math: true   # only if the post contains formulas
---

---
**Abstract**

<brief summary>

---

## Introduction

<content starts here>
```

3. **Tag**: a free-text label shown next to the date. Reuse an existing one if it fits (`grep -h '^tag:' content/_blog/*.md | sort -u`).

4. **Build check**:
   ```bash
   cd "$(git rev-parse --show-toplevel)"
   if [ -d "$HOME/.rbenv" ]; then export PATH="$HOME/.rbenv/bin:$PATH"; eval "$(rbenv init - bash)"; fi
   bundle exec jekyll build 2>&1
   ```

5. **Local preview**: If server is running, use Playwright to navigate to `http://127.0.0.1:4000/blog/<slug>/` and take a screenshot.

## Notes

- Blog collection: `content/_blog/` (not `_posts/`); `layout: post` is applied by `_config.yml` defaults
- Permalink: `/blog/:title/`
- The blog listing shows date and title only
- Math: set `math: true`, then `$...$` inline and `$$...$$` display
- Code blocks: fenced blocks with a language identifier (highlighted by Rouge at build time)
- Images: `assets/images/blog/<slug>/`, inside `<figure>` with a `<figcaption>`
