# Nuxt CSS layer (@web-baseline/nuxt-css-layer)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

_✨ Use css cascade layers in Nuxt ✨_

> Compatible with Nuxt 4.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

**English** | [简体中文](./README.zh-CN.md)

## Features

- Add layer names to imported CSS files via `?layer=` query
	- In Vue SFC, `<style layer="...">` is handled through the corresponding `?layer=` style request query
- Add layer names to matched CSS files with rule-based mapping
- Sort cascade layers globally via server-side injected `@layer` order

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @web-baseline/nuxt-css-layer
```

That's it! You can now use css cascade layers in your Nuxt app ✨

## Usage

### 1) Configure the module

```ts
// nuxt.config.ts
export default defineNuxtConfig({
	modules: ['@web-baseline/nuxt-css-layer'],
	cssLayer: {
		rules: [
			{
				includes: /^node_modules\/element-plus/,
				layerName: 'element-plus',
			},
		],
		cssLayerOrder: ['base', 'element-plus', 'app'],
	},
})
```

### 2) Add layer by import query

```ts
// app.vue / any entry file
import './theme.css?layer=base'
```

### 3) Add layer in Vue SFC style block

```vue
<style scoped layer="app">
.app-root {
	color: red;
}
</style>
```

With default `importQuery: true`, this module reads `layer` query from SFC style requests, so using the `layer` attribute in `<style>` works directly.

### Known issue (SFC `layer` without value)

When using `<style layer>` in SFC (without an explicit layer name), Vite style request id generation converts it to `layer=true`.

Because query parsing cannot distinguish boolean and string in this case, a layer named `true` will be generated.

If you need an anonymous layer, set the layer name to a single space:

```vue
<style layer=" ">
/* anonymous layer */
</style>
```

### 4) Optional: enforce global layer order

When `cssLayerOrder` is provided, this module injects the following into SSR `<head>`:

```css
@layer base, element-plus, app;
```

This ensures deterministic cascade order across your app and third-party styles.


### Options

| Option             | Description                                                                                                      | Type                              | Default     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| importQuery        | Enable `?layer=` query parsing (controls both normal CSS imports and SFC `<style layer="...">` processing)   | `boolean`                         | `true`      |
| rules              | Rule-based CSS mapping to layer names (from [`@web-baseline/postcss-wrap-up-layer`](https://github.com/web-baseline/postcss-wrap-up-layer#options-type)) | `PostcssWrapUpLayerOptions['rules']` | `[]`    |
| ignoreOnlyComments | Ignore files that only contain comments (forwarded to `postcss-wrap-up-layer`)                                 | `boolean \| undefined`           | `undefined` |
| cssLayerOrder      | Cascade layer sorting                                                                                            | `string \| string[] \| undefined` | `undefined` |

## How it works

- `importQuery` adds a PostCSS plugin that reads `layer` from import query, for example `a.css?layer=base`.
- SFC `<style layer="...">` follows the same `?layer=` query parsing path, so it is also controlled by the `importQuery` switch.
- `rules` adds another PostCSS plugin instance for path-based mapping.
- `cssLayerOrder` creates a Nitro server plugin to inject `@layer ...;` into SSR HTML head.

## Development

```bash
pnpm dev          # run playground
pnpm lint         # eslint
pnpm test         # unit + e2e tests
pnpm build        # full build pipeline
```



<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@web-baseline/nuxt-css-layer/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[npm-downloads-src]: https://img.shields.io/npm/dm/@web-baseline/nuxt-css-layer.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[codecov-src]: https://img.shields.io/codecov/c/github/web-baseline/nuxt-css-layer?style=flat&colorA=020420&colorB=00DC82
[codecov-href]: https://codecov.io/gh/web-baseline/nuxt-css-layer

[license-src]: https://img.shields.io/npm/l/@web-baseline/nuxt-css-layer.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
