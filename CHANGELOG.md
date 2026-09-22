# Changelog

All notable changes to this site are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

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

- The Video section no longer embeds the Vimeo player, which was showing a
  player error instead of the film. It now shows the film's poster. The image
  links to `https://vimeo.com/212780263` and opens in a new tab.
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
