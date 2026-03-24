---
name: new-post
description: Scaffold a new blog post with correct frontmatter and file path. Use when the user says "new post", "write a post", "create a blog entry", "blog about", or any request to add content to the blog. Usage /new-post <title>
---

Create a new blog post in the `content/_blog/` directory.

Use `$ARGUMENTS` as the post title. If no arguments provided, ask the user for a title.

## Steps

1. **Read existing tags** from `_data/tags.yml` to know available tags.

2. **Generate a slug** from the title: lowercase, hyphens for spaces, strip special characters, max 60 chars.
   Example: `"My Thoughts on Flow Matching"` → `my-thoughts-on-flow-matching`

3. **Create the file** at `content/_blog/<slug>.md`:

```yaml
---
title: "<Title>"
date: <today's date YYYY-MM-DD>
layout: post
tag: <selected tag>
description: "<1-2 sentence preview for blog cards>"
---

---
**Abstract**

<brief summary>

---

## Introduction

<content starts here>
```

4. **Tag selection**: Present existing tags to the user. If none fit, add a new tag entry to `_data/tags.yml` first.

5. **Build check**:
   ```bash
   export PATH="$HOME/.rbenv/bin:$PATH" && eval "$(rbenv init - bash)"
   bundle exec jekyll build 2>&1
   ```

6. **Local preview**: If server is running, use Playwright to navigate to `http://127.0.0.1:4000/blog/<slug>/` and take a screenshot.

## Notes

- Blog collection: `content/_blog/` (not `_posts/`)
- Permalink: `/blog/:title/`
- The `description` field is used for card previews on the blog listing and homepage; falls back to first 150 chars if absent
- MathJax available: `$$...$$` for display math, `\\(...\\)` for inline
- Code blocks: use fenced blocks with language identifiers
