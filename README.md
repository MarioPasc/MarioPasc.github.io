# MarioPasc.github.io

Personal academic website, built by GitHub Pages from the `main` branch with
Jekyll. No theme, no JavaScript, one stylesheet.

## Where things live

| Content | File |
| --- | --- |
| Name, affiliations, e-mail, profile links, research interests | `_data/profile.yml` |
| News on the home page | `_data/news.yml` |
| Publications (home page shows `selected: true`) | `_data/publications.yml` |
| CV sections | `_data/cv.yml` |
| Citation metrics (generated) | `_data/metrics.yml` |
| Blog posts | `content/_blog/*.md` (see `content/_blog/_README.md`) |
| Page structure | `index.html`, `publications.html`, `cv.html`, `blog/index.html` |
| Templates | `_layouts/`, `_includes/` |
| Styles | `assets/css/main.css` |

`/about/` and `/research/` redirect to the new pages (`redirects/`).

## Updating citation metrics

Google Scholar has no API and blocks most CI runners, so refresh the numbers
locally before pushing:

```bash
python3 scripts/update_metrics.py
```

The script only rewrites `_data/metrics.yml` if the profile page parses.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

GitHub Pages builds with Jekyll 3.10 and its whitelisted plugins; the local
Gemfile uses Jekyll 4. Keep templates to features both support (no Sass,
no custom plugins).
