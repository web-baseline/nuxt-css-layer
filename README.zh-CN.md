# Nuxt CSS layer (@web-baseline/nuxt-css-layer)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

_✨ 在 Nuxt 中使用 CSS 级联层 ✨_

- [✨ &nbsp;Release Notes](/CHANGELOG.md)


## 特性

- 为 CSS 文件添加级联层（使用 [@web-baseline/postcss-wrap-up-layer](https://github.com/web-baseline/postcss-wrap-up-layer)）
- 允许 Vue SFC 的 `<style>` 块设置 CSS 级联层 （使用 [@web-baseline/vite-plugin-vue-style-layer](https://github.com/web-baseline/postcss-wrap-up-layer/blob/main/README.zh-CN.md)）
- CSS 级联层排序

## 快速开始

使用一个命令将模块安装到 Nuxt 应用程序中：

```bash
npx nuxi module add @web-baseline/nuxt-css-layer
```

就是这样！现在，您可以在 Nuxt 应用程序中使用 CSS 级联层 ✨


### 配置

| 配置项             | 描述                                                                                                                                                                              | 类型                              | 默认值      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| sfc                | 是否开启单文件组件处理                                                                                                                                                            | `boolean`                         | `true`      |
| sfcIncludes        | 单文件组件处理包含的文件（参考[`@web-baseline/vite-plugin-vue-style-layer`](https://github.com/web-baseline/vite-plugin-vue-style-layer/tree/main?tab=readme-ov-file#options)）   | --                                | --          |
| rules              | CSS文件处理规则（参考[`@web-baseline/postcss-wrap-up-layer`](https://github.com/web-baseline/postcss-wrap-up-layer/blob/main/README.zh-CN.md#%E9%80%89%E9%A1%B9%E7%B1%BB%E5%9E%8B)）                                                                                                                      | --                                | --          |
| ignoreOnlyComments | 是否忽略仅包含注释的文件（参考[`@web-baseline/postcss-wrap-up-layer`](https://github.com/web-baseline/postcss-wrap-up-layer/blob/main/README.zh-CN.md#%E9%80%89%E9%A1%B9%E7%B1%BB%E5%9E%8B)）                                                                                                             | --                                | --          |
| cssLayerOrder      | 级联层排序                                                                                                                                                                        | `string \| string[] \| undefined` | `undefined` |



<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@web-baseline/nuxt-css-layer/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[npm-downloads-src]: https://img.shields.io/npm/dm/@web-baseline/nuxt-css-layer.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[license-src]: https://img.shields.io/npm/l/@web-baseline/nuxt-css-layer.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
