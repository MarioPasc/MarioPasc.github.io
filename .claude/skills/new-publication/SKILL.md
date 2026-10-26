---
name: new-publication
description: Add a paper, preprint or congress communication to the site's publication list, and optionally a news item and home-page entry. Use when the user says "new paper", "add a publication", "add my preprint", "paper accepted", "new arXiv", "update publications", or "document my research on". Usage /new-publication <arXiv id | DOI | title>
---

Add an entry to `_data/publications.yml` (the single source for `/publications/`, the home page's "Selected papers" and the CV's publication counts).

Use `$ARGUMENTS` as an arXiv id, DOI or title. If none is given, ask for one.

## Steps

1. **Fetch metadata** (title, authors in order, venue, volume, pages, year):
   - arXiv: `https://api.openalex.org/works/doi:10.48550/arXiv.<id>` (fast) or the arXiv abstract page
   - DOI: `https://api.crossref.org/works/<doi>`
   Never guess authors, pages or venues; mark anything unverified and ask.

2. **Pick the group and id**:

   | Group | id prefix |
   |-------|-----------|
   | Journal articles | `J` |
   | Manuscripts under review | `R` |
   | Preprints | `P` |
   | Conference proceedings | `C` |
   | Communications at clinical congresses | `C` (continue the sequence) |

   Use the next free number. If a preprint becomes a journal article, move the entry and keep the arXiv link.

3. **Write the entry**, newest first within the group:

```yaml
    - id: P4
      selected: true            # only for papers that should appear on the home page
      authors: M. Pascual-González, A. Other, E. López-Rubio
      title: Sentence-case title
      venue: arXiv preprint arXiv:2611.01234
      details: vol. 12, pp. 1–10   # optional
      year: 2026
      note: One line, e.g. an award   # optional, HTML allowed
      links:
        - label: arXiv
          url: https://arxiv.org/abs/2611.01234
        - label: code
          url: https://github.com/MarioPasc/<repo>
      bibtex: |-
        @misc{pascualgonzalez2026key,
          title         = {...},
          author        = {Pascual-Gonz{\'a}lez, Mario and ...},
          year          = {2026},
          eprint        = {2611.01234},
          archivePrefix = {arXiv}
        }
```

   The author string must match `profile.citation_name` (`M. Pascual-González`) exactly to be bolded.

4. **News item** (ask first): add a line to the top of `_data/news.yml` linking `[[P4](/publications/#P4)]`.

5. **Build check and preview**:
   ```bash
   cd "$(git rev-parse --show-toplevel)"
   if [ -d "$HOME/.rbenv" ]; then export PATH="$HOME/.rbenv/bin:$PATH"; eval "$(rbenv init - bash)"; fi
   bundle exec jekyll build 2>&1
   ```
   If the server is running, screenshot `http://127.0.0.1:4000/publications/` and check the anchor `#<id>` resolves.

## Notes

- Citation metrics come from Google Scholar via `python3 scripts/update_metrics.py`, not from this file
- Keep the LaTeX CV and this file consistent; the CV is the source of truth for titles of manuscripts under review
