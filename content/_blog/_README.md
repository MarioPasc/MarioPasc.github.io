# Blog Post Template

To create a new blog post, create a file in `content/blog/` with this format:

**File naming:** Use descriptive names like `my-awesome-project.md` or `python-tutorial.md`

**Template:**
```markdown
# Blog Post Template

To create a new blog post, create a file in `content/_blog/` with this format:

**File naming:** Use descriptive names like `my-awesome-project.md` or `python-tutorial.md`

**Template:**
```markdown
---
title: "Your Blog Post Title"
date: YYYY-MM-DD
layout: post
tag: your-tag-name
---

Your blog post content here...
```

**Available tags** (defined in `_data/tags.yml`):
- esp32
- (add more as needed)

The blog posts will automatically appear on the `/blog/` page once Jekyll builds the site.
```

**Available tags:** Check `_data/tags.yml` for existing tags or add new ones.

**Supported code languages:** python, cpp, javascript, js, and more.
