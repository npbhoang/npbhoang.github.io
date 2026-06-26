# npbhoang.github.io

Personal academic homepage — <https://npbhoang.github.io>.

A plain static site: hand-written HTML and CSS, no build step, no dependencies.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page (content + a small inline script for the theme toggle). |
| `style.css` | All styling, including the light/dark themes. |
| `resume.pdf` | Full CV (kept in the repo; not linked from the page). |
| `*.pdf` | Posters and publication summary. |
| `robots.txt` | Asks search engines / AI crawlers not to index the site. |

## Editing

Open `index.html` and edit the content directly. To preview, just open the file
in a browser — there is nothing to build or install.

### Light / dark mode

The theme follows the operating-system preference by default and can be toggled
with the button in the top-right corner; the choice is remembered in
`localStorage`. You can also force a theme for testing with a query parameter:
`index.html?theme=dark` or `?theme=light`.

## Deployment

Hosted with GitHub Pages, served directly from the `master` branch root. Pushing
to `master` updates the live site.

## Privacy / crawlers

- `robots.txt` plus a `noindex` meta tag ask search engines and AI crawlers to
  stay away. Compliant bots obey; malicious scrapers can ignore both.
- The name and email address are injected by JavaScript at runtime (base64), so
  they are not in the static HTML that simple harvesters read — but they are
  fully visible to real visitors. Note this is partial: the publication titles
  and co-authors still identify the author to anyone who reads the page.
