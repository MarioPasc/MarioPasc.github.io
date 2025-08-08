# Blog Post Template

To create a new blog post, create a file in `content/blog/` with this format:

**File naming:** Use descriptive names like `my-awesome-project.md` or `python-tutorial.md`

**Template:**
```markdown
---
title: "Your Blog Post Title"
date: YYYY-MM-DD
layout: post
tag: your-tag-name
---

# Your Blog Post Title

Your content goes here...

## Code Examples

<div class="code-block">
  <code data-lang="python">
def hello_world():
    print("Hello, World!")
  </code>
</div>

## More Content

Continue writing your post...
```

**Available tags:** Check `_data/tags.yml` for existing tags or add new ones.

**Supported code languages:** python, cpp, javascript, js, and more.
