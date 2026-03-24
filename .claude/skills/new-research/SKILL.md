---
name: new-research
description: Scaffold a new research project page with correct frontmatter and file path. Use when the user says "new research page", "add a project", "create research entry", "document my research on", or any request to add content to the research collection. Usage /new-research <title>
---

Create a new research project page in the `content/_research/` directory.

Use `$ARGUMENTS` as the project title. If no arguments provided, ask the user for a title.

## Steps

1. **Generate a slug** from the title: lowercase, hyphens for spaces, strip special characters, max 60 chars.

2. **Create the file** at `content/_research/<slug>.md`:

```yaml
---
title: "<Title>"
date: <today's date YYYY-MM-DD>
layout: default
---

## Abstract

<One-paragraph summary>

## Motivation

<Why this research matters>

## Methods

<Approach, models, datasets — use MathJax for equations>

## Results

<Key findings, figures, tables>

## Resources

- **Code**: [GitHub](https://github.com/MarioPasc/<repo>)
- **Paper**: [Link](<url>)

## Citation

```bibtex
@article{pascual2025...,
  title={...},
  author={Pascual-González, Mario and ...},
  year={2025}
}
```
```

3. **Also add to publications data** — If this research has a publication, add an entry to `_data/publications.yml` following the format documented in CLAUDE.md. Set `featured: true` to show on the homepage.

4. **Build check**:
   ```bash
   export PATH="$HOME/.rbenv/bin:$PATH" && eval "$(rbenv init - bash)"
   bundle exec jekyll build 2>&1
   ```

5. **Local preview**: If server running, use Playwright to navigate to `http://127.0.0.1:4000/research/<slug>/` and screenshot.

## Notes

- Research collection outputs to `/research/:path/`
- MathJax: `$$...$$` for display math, `\\(...\\)` for inline
- Image assets: `assets/images/research/<slug>/`
- The main research page (`content/_research/index.md`) uses `_includes/research-content.html` which pulls publications from `_data/publications.yml`
