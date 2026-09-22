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

- New colour knobs in `css/colors.css`: `--page-bg-color`, `--page-text-color`,
  `--video-bg-color` and `--video-text-color`. As with the existing variables,
  edit these to recolour a section without touching `css/main.css`.

### Notes

- The Home and Contact sections keep their background photographs. Both already
  sat on black with a dark overlay, so only their colours were in scope.
