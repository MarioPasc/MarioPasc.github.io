---
name: new-post
description: Scaffold a new blog post with correct frontmatter and file path. Use when the user says "new post", "write a post", "create a blog entry", "blog about", or any request to add content to the blog. Usage /new-post <title>
---

Create a new blog post in the `content/_blog/` directory.

Use `$ARGUMENTS` as the post title. If no arguments provided, ask the user for a title.

## Steps

1. **Read existing tags** from `_data/tags.yml` and scan existing posts in `content/_blog/` to know all available tags.

2. **Generate a slug** from the title: lowercase, hyphens for spaces, strip special characters, max 60 chars.
   Example: `"My Thoughts on Flow Matching"` → `my-thoughts-on-flow-matching`

3. **Create the file** at `content/_blog/<slug>.md` with this frontmatter:

```yaml
---
title: "<Title>"
date: <today's date in YYYY-MM-DD format>
layout: post
tag: <selected tag>
---
```

4. **Add the post structure**:

```markdown

**Abstract**

<brief summary — ask the user or leave a placeholder>

---

## Introduction

<content starts here>
```

5. **Tag selection**: Present the existing tags to the user. If none fit, create a new tag entry in `_data/tags.yml` following the existing format before using it.

6. **Build check**: Run `bundle exec jekyll build 2>&1` to verify the new post compiles without errors.

7. **Local preview**: If the server is running, use Playwright to navigate to the new post's URL (`http://localhost:4000/blog/<slug>/`) and take a screenshot to confirm it renders correctly.

## Notes

- The blog collection is at `content/_blog/` (not `_posts/`)
- Permalink pattern: `/blog/:title/` (from `_config.yml`)
- MathJax is available: use `$$...$$` for display math, `\\(...\\)` for inline
- For posts with code: use fenced code blocks with language identifiers (```python, ```bash, etc.)
