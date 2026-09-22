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
- The overlay on the Donate section is now a neutral black tint rather than the
  previous red-tinted `rgba(28, 2, 2, .74)`, so the section reads as true black.

### Added

- New colour knobs in `css/colors.css`: `--page-bg-color`, `--page-text-color`,
  `--video-bg-color`, `--video-text-color`, and `--donate-bg-overlay`. As with
  the existing variables, edit these to recolour a section without touching
  `css/main.css`. Every variable in `css/colors.css` is now actually consumed.

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
