# Changelog

All notable changes to this site are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- The Contact section no longer shows the volcano photograph. It is now plain black
  like the other sections, set by a new `--contact-bg-color` in `css/colors.css`.
  The `--contact-bg-image` variable and the 58% dim over that photo are removed.
  The Home section keeps its photograph.
- The Subscribe section's book entry now shows the "Spiritual Maintenance" title above the cover image, matching the other columns that open with a title.
- The Subscribe section's Prayer Tracks entry now carries a short description under its Spotify and Apple links, like the Sermons and Podcast entries.
- Every homepage section now renders on a black background. The About and
  Subscribe sections changed from grey (`rgb(174, 174, 174)`) and brown
  (`rgb(86, 67, 67)`); the Video section, which previously had no background of
  its own and fell through to the browser default, is now styled explicitly.
- All section text is now white, including headings and links. Previously the
  theme skin coloured every `h2` salmon (`#ff887b`) and every link salmon
  (`#e07368`) in the About, Video, Donate and Subscribe sections; only the Home
  and Contact sections overrode it. Contact-section links were a pale cream
  (`#fcffcc`) and are now white via `--contact-text-color`, which was defined
  but previously unused.
- The page itself (`body`, `#pagewrap`) is now black, so gutters and any
  unstyled area match the sections instead of showing through white.
- Removed a CSS rule for the Donate section's overlay that could never match the
  page. It selected `> div > .builder_row_cover`, but that element is a direct
  child of the row, not a grandchild. It had been carrying a red tint
  (`rgba(28, 2, 2, .74)`) that consequently never rendered. The Donate section
  reads as true black and always did, via its own `background-color`.

### Added

- The header now has a scrolled state. `js/main.js` adds `fixed-header-on` to `<body>`
  once the page is scrolled more than 50px and removes it at the top. Nothing applied
  that class before, because the theme script that did is not part of this site, so the
  header rules keyed on it never ran. They now do: at 800px and up, past 50px the logo and
  nav sit about 10-12px lower (`css/main.css` adds 10px under the logo, and the theme's
  split-menu rules add padding above it). The logo stays 200px wide. Below 800px the
  fixed bar does not move.
- `npm start` serves this folder with Node (`scripts/serve.js`) at
  `http://127.0.0.1:3000`. No extra package. `PORT` and `HOST` override the
  address. Text and image responses send `Cache-Control: no-cache` plus an
  `ETag`, so a reload revalidates instead of reusing a stale file. Directory
  URLs such as `/feed/` resolve to `index.html` or `index.xml`.
- `npm test` smoke-checks the homepage with Playwright and smky: the document
  title, the five nav labels, Home / About / Contact / Donate / Sermons copy,
  the contact fields, and the PayPal form. It uses the same server on
  `http://127.0.0.1:4173` for the run. Opening `index.html` directly is unchanged.
- A **Spiritual Maintenance** entry in the Subscribe section: the book cover plus
  a link to its Amazon listing. Defined in `templates/subscribe5.md.js`, with the
  cover at `graphics/Spiritual Maintenance book by Aaron Brewer.png`. The
  filename is deliberately descriptive because `raster()` uses its argument as
  both the image path and the `alt` text. **The cover image itself is a link** to
  the same listing, so readers can click the book as well as the Amazon icon.
- A **Prayer Tracks** entry in the Subscribe section, linking to Aaron Brewer's
  artist pages on Spotify and Apple Music. Defined in
  `templates/subscribe4.md.js`; it mounts on a new `#subscribe4` div in a second
  sub-row of the Subscribe block, which `js/main.js` picks up automatically.
- New colour knobs in `css/colors.css`: `--page-bg-color`, `--page-text-color`,
  `--video-bg-color` and `--video-text-color`. As with the existing variables,
  edit these to recolour a section without touching `css/main.css`.

### Fixed

- The header no longer covers the person's head in the Home banner photo. The Home
  section now starts its photo just far enough below the header (a transparent top
  border, `--home-photo-inset` in `css/main.css`) that the head clears the header by
  `--home-head-clearance` (24px, `css/images.css`), so the head sits as high as is safe
  at every width. On screens about 1435px and wider the photo starts at the top as
  before. The header heights are `--home-header-clear` (141px, 64px under 800px) and the
  photo's focal point is `--home-bg-focus-x` / `--home-bg-focus-y`.
- Text in the Home, Contact, Donate and Subscribe sections no longer touches the
  edges of the screen. Below the 1160px content width the builder ran those rows
  edge to edge, so on phones (and down to about 1180px wide) copy, form fields and
  images sat 0-10px from the viewport. `css/main.css` now adds a side gutter,
  `--mobile-gutter` (1.5rem), inside those rows; backgrounds and the Video embed
  stay full width. On phones the About section uses the same gutter instead of its
  own 6%. Wider screens are unchanged.
- Below 800px wide the header is a bar fixed to the top of the screen, with the logo on
  the left and a hamburger button on the right, instead of the full nav sitting over the
  top of the Home photo (where it wrapped onto several rows and covered the heading,
  "Releasing the Kingdom of Heaven Upon the Earth"). The hamburger opens a panel that
  slides in from the right with About, Video, Contact, Donate and Subscribe; the close
  button, or tapping a link, closes it. The hamburger and its panel never worked here
  because the theme files that provided them (`media-queries.css`, `themify.script.js`)
  are not part of this site. `css/main.css` now styles them, `js/main.js` wires the
  theme's side menu plugin, and `index.html` gains a small logo link in the bar. Menu links
  scroll to the section just below the bar. The Home content starts below the bar using
  `--header-height`, and `css/colors.css` has a new `--header-bg-color`. At 800px and up
  the header is unchanged.
- The Video section embeds the Vimeo player again, reverting the poster-and-link
  stand-in. `templates/video.md.js` holds the `<iframe>` for
  `https://player.vimeo.com/video/212780263`, and the poster-specific
  `.tb_section-video .video-wrap` rules are removed so the theme's 16:9 box
  applies again.
- The page head now has a canonical URL on `www.volcanicinternational.org`, a
  description taken from the About copy, and Open Graph / Twitter card tags
  pointing at `graphics/share-card.jpg` (1200×630). The empty canonical and
  shortlink, and the WordPress generator tag, are gone.
- Section templates now wait until every helper script has loaded or failed.
  The old check looked at helper names, which are always truthy, so the first
  helper to finish inserted the templates. A slow load could run About before
  `photo()` existed and replace the section with a load error.
- Home and Contact photographs are dimmed by the overlays `css/main.css` already
  declared. The cover elements had no box, so the veil never painted. Home uses
  `--home-bg-overlay` (30% black) and Contact uses `rgba(0, 0, 0, .58)`. Donate
  and Subscribe stay undimmed.
- The homepage no longer requests `media-queries.css`, `themify.script.js`, or
  `wp-emoji-release.min.js`. Those files are not in this export. The emoji
  probe also ran a canvas test on every view before asking for the missing
  script. Native emoji still render.
- `logo()` in `js/functions/logo.js` defaulted to `vector('logo')`, resolving to
  `graphics/logo.svg`, which does not exist — only `graphics/logo.png` does. The
  default is now the raster path. Nothing called `logo()`, so this was a trap for
  the next caller rather than a live break.

- Icon links in the Subscribe section pointed at `href="0"`, `href="1"`, … instead
  of their destinations, so all five of them — one under Sermons and four under
  Podcast — navigated nowhere. `icons()` in `js/functions/icons.js` iterated with
  `Object.keys(list).forEach(function (name, link))`, where `forEach` supplies the
  array *index* as the second argument rather than the map's value. It now
  iterates `Object.entries()`.

### Removed

- The WordPress REST, RSD/XML-RPC and oEmbed discovery `<link>` tags in
  `index.html`'s `<head>`. This site is a static export served from GitHub Pages,
  so `wp-json/`, `wp-json/wp/v2/pages/7`, `wp-json/oembed/1.0/embed` and
  `xmlrpc.php` never existed here. Canonical, shortlink, favicon and generator
  tags are untouched.

### Notes

- The Home and Contact sections keep their background photographs. A later fix
  gives their declared cover overlays a box so the dim actually paints.
