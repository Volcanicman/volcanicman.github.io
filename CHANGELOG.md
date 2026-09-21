# Changelog

All notable changes to this site are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Every homepage section now renders on a black background. The About and
  Subscribe sections changed from grey (`rgb(174, 174, 174)`) and brown
  (`rgb(86, 67, 67)`); the Video section, which previously had no background of
  its own and fell through to the browser default, is now styled explicitly.
- About-section body text is now white so it stays readable on the new
  background.
- The page itself (`body`, `#pagewrap`) is now black, so gutters and any
  unstyled area match the sections instead of showing through white.
- The overlay on the Donate section is now a neutral black tint rather than the
  previous red-tinted `rgba(28, 2, 2, .74)`, so the section reads as true black.

### Added

- New colour knobs in `css/colors.css`: `--page-bg-color`, `--page-text-color`,
  `--video-bg-color`, `--video-text-color`, and `--donate-bg-overlay`. As with
  the existing variables, edit these to recolour a section without touching
  `css/main.css`.

### Notes

- The Home and Contact sections keep their background photographs. Both already
  sat on black with a dark overlay, so only their colours were in scope.
