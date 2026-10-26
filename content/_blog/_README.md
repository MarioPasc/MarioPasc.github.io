# Writing a blog post

Create `content/_blog/<short-slug>.md`. Files starting with `_` (like this
one) are not published.

````markdown
---
title: "Post title"
date: YYYY-MM-DD
tag: free-text label shown next to the date (optional)
---

Text in Markdown. Code uses fenced blocks with a language name, highlighted
at build time by Rouge:

```python
print("hello")
```
````

The post appears on `/blog/` and at `/blog/<short-slug>/` after the next build.
Images go in `assets/images/blog/<post>/`.
