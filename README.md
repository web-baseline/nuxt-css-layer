# Nuxt CSS layer (@web-baseline/nuxt-css-layer)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

_✨ Use css cascade layers in Nuxt ✨_

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

**English** | [简体中文](./README.zh-CN.md)

## Features

- Add cascading layers to CSS files ( By [@web-baseline/postcss-wrap-up-layer](https://github.com/web-baseline/postcss-wrap-up-layer) )
- Allow adding cascading layer to style blocks in Vue SFC ( By [@web-baseline/vite-plugin-vue-style-layer](https://github.com/web-baseline/vite-plugin-vue-style-layer) )
- CSS cascading layer sorting

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @web-baseline/nuxt-css-layer
```

That's it! You can now use css cascade layers in your Nuxt app ✨


### Options

| Option             | Description                                                                                                      | Type                              | Default     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| sfc                | Is SFC processing enabled                                                                                        | `boolean`                         | `true`      |
| sfcIncludes        | SFC files (refer to [`@web-baseline/vite-plugin-vue-style-layer`](https://github.com/web-baseline/vite-plugin-vue-style-layer/tree/main?tab=readme-ov-file#options))                            | --                                | --          |
| rules              | CSS file rules (refer to [`@web-baseline/postcss-wrap-up-layer`](https://github.com/web-baseline/postcss-wrap-up-layer?tab=readme-ov-file#options-type))                          | --                                | --          |
| ignoreOnlyComments | Ignore files that only contain comments (refer to [`@web-baseline/postcss-wrap-up-layer`](https://github.com/web-baseline/postcss-wrap-up-layer?tab=readme-ov-file#options-type)) | --                                | --          |
| cssLayerOrder      | Cascade layer sorting                                                                                            | `string \| string[] \| undefined` | `undefined` |



<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@web-baseline/nuxt-css-layer/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[npm-downloads-src]: https://img.shields.io/npm/dm/@web-baseline/nuxt-css-layer.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[license-src]: https://img.shields.io/npm/l/@web-baseline/nuxt-css-layer.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
