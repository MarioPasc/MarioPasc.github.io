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


**Available tags:** Check `_data/tags.yml` for existing tags or add new ones.

**Supported code languages:** python, cpp, javascript, js, and more.

---
**Code examples**

```
<div class="code-block">
  <code data-lang="python">
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
# Example usage
print(fibonacci(10))
  </code>
</div>
```

**C++ Example**

```
<div class="code-block">
  <code data-lang="cpp">
#include &lt;iostream&gt;
using namespace std;

int main() {
    int x = 42;
    cout &lt;&lt; "Hello World!" &lt;&lt; endl;
    return 0;
}
  </code>
</div>
```