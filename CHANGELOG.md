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

- The Home and Contact sections keep their background photographs. Both already
  sat on black with a dark overlay, so only their colours were in scope.
