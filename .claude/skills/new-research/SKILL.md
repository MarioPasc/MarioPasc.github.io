---
name: new-research
description: Scaffold a new research project page with correct frontmatter and file path. Use when the user says "new research page", "add a project", "create research entry", "document my research on", or any request to add content to the research collection. Usage /new-research <title>
---

Create a new research project page in the `content/_research/` directory.

Use `$ARGUMENTS` as the project title. If no arguments provided, ask the user for a title.

## Steps

1. **Generate a slug** from the title: lowercase, hyphens for spaces, strip special characters, max 60 chars.

2. **Create the file** at `content/_research/<slug>.md` with this frontmatter:

```yaml
---
title: "<Title>"
date: <today's date in YYYY-MM-DD format>
layout: post
---
```

If the page needs custom JavaScript (e.g., interactive visualisations), add:
```yaml
scripts:
  - /assets/js/<script-name>.js
```

3. **Structure the content** for a scientific audience:

```markdown

## Abstract

<One-paragraph summary of the project>

## Motivation

<Why this research matters, gap in the literature>

## Methods

<Approach, models, datasets — use MathJax for equations>

## Results

<Key findings, figures, tables>

## Resources

- **Code**: [GitHub repository](https://github.com/MarioPasc/<repo>)
- **Paper**: [arXiv / journal link](<url>)
- **Dataset**: [Source](<url>)

## Citation

```bibtex
@article{pascual2025...,
  title={...},
  author={Pascual-González, Mario and ...},
  journal={...},
  year={2025}
}
```
```

4. **Build check**: Run `bundle exec jekyll build 2>&1` to verify compilation.

5. **Local preview**: If the server is running, use Playwright to navigate to the new page's URL (`http://localhost:4000/research/<slug>/`) and take a screenshot.

## Notes

- The research collection outputs to `/research/:path/` (from `_config.yml`)
- MathJax is enabled globally: `$$...$$` for display math, `\\(...\\)` for inline math
- For heavy LaTeX content, test rendering locally — some edge cases (aligned environments, custom macros) may need `\begin{aligned}` inside `$$`
- Image assets for research pages go in `assets/images/research/<slug>/`
