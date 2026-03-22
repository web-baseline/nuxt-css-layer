# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- No changes yet.

## [1.0.0] - 2026-03-22

### Added
- Support `?layer=` import query parsing via unified PostCSS path.
- Add module tests to verify plugin registration and configuration.

### Changed
- Refactor module options from `sfc`/`sfcIncludes` to `importQuery`.
- Upgrade project dependencies.

### Deprecated
- Deprecate `@web-baseline/vite-plugin-vue-style-layer`.

### Docs
- Update documentation with CSS cascade layer usage examples and configuration notes.

## [0.2.0] - 2025-01-15

### Changed
- Upgrade project dependencies.

## [0.1.0] - 2024-06-22

### Added
- Initial public release.
- Support adding CSS cascade layers to Vue SFC style blocks.
- Support rule-based layer mapping through `rules` option.
- Support global cascade sorting through `cssLayerOrder`.
- Add test files.
- Add README language switch section.

### Documentation
- Add project license file (`MIT`).

[Unreleased]: https://github.com/web-baseline/nuxt-css-layer/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/web-baseline/nuxt-css-layer/releases/tag/v1.0.0
[0.2.0]: https://github.com/web-baseline/nuxt-css-layer/releases/tag/v0.2.0
[0.1.0]: https://github.com/web-baseline/nuxt-css-layer/releases/tag/v0.1.0
