# Nuxt CSS layer (@web-baseline/nuxt-css-layer)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

_✨ 在 Nuxt 中使用 CSS 级联层 ✨_

> 兼容 Nuxt 4。

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

[English](./README.md) | **简体中文**

## 特性

- 通过 `?layer=` 查询参数为导入的 CSS 指定层名
	- 在 Vue 单文件组件中，`<style layer="...">` 会被转换为对应的 `?layer=` 请求参数后处理
- 通过规则匹配（`rules`）批量为 CSS 文件分配层名
- 通过服务端注入的 `@layer` 声明统一层级顺序

## 快速开始

使用一个命令将模块安装到 Nuxt 应用程序中：

```bash
npx nuxi module add @web-baseline/nuxt-css-layer
```

就是这样！现在，您可以在 Nuxt 应用程序中使用 CSS 级联层 ✨

## 使用方式

### 1）配置模块

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

### 2）通过导入查询参数声明层

```ts
// app.vue / 任意入口文件
import './theme.css?layer=base'
```

### 3）在 Vue SFC 的 style 块声明层

```vue
<style scoped layer="app">
.app-root {
	color: red;
}
</style>
```

`importQuery` 默认开启时，会识别 SFC style 请求中的 `layer` 查询参数，因此可直接在 `<style>` 块上使用 `layer` 属性。

### 已知问题（SFC `layer` 空属性）

当在 SFC 中使用 `<style layer>`（未显式指定层名）时，受 Vite 生成 style 请求 id 的方式影响，会被转换为 `layer=true`。

由于查询参数中无法区分字符串与布尔值，该场景下最终会生成名为 `true` 的级联层。

如果你期望生成匿名层，请将层名设置为单个空格：

```vue
<style layer=" ">
/* anonymous layer */
</style>
```

### 4）可选：统一全局层顺序

当配置了 `cssLayerOrder` 后，模块会在 SSR 的 `<head>` 中注入：

```css
@layer base, element-plus, app;
```

这样可以确保应用样式与三方库样式的层叠顺序稳定可控。


### 配置

| 配置项             | 描述                                                                                                                                                                              | 类型                              | 默认值      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| importQuery        | 是否启用对 `?layer=` 的解析（同时控制普通 CSS 导入与 SFC `<style layer="...">` 的层处理）                                                                                     | `boolean`                         | `true`      |
| rules              | 基于规则将 CSS 文件映射到层名（继承 [`@web-baseline/postcss-wrap-up-layer`](https://github.com/web-baseline/postcss-wrap-up-layer/blob/main/README.zh-CN.md#选项类型) 的 `rules`） | `PostcssWrapUpLayerOptions['rules']` | `[]`    |
| ignoreOnlyComments | 是否忽略仅包含注释的文件（透传给 `postcss-wrap-up-layer`）                                                                                                                       | `boolean \| undefined`           | `undefined` |
| cssLayerOrder      | 级联层排序                                                                                                                                                                        | `string \| string[] \| undefined` | `undefined` |

## 工作原理

- `importQuery`：注册 PostCSS 插件，从导入查询参数读取 `layer`（例如 `a.css?layer=base`）。
- SFC 的 `<style layer="...">` 也会落到同一条 `?layer=` 查询参数解析链路，因此同样受 `importQuery` 开关控制。
- `rules`：额外注册一组基于文件路径匹配的 PostCSS 规则。
- `cssLayerOrder`：生成 Nitro 服务端插件，在 SSR HTML 头部注入 `@layer` 声明。

## 本地开发

```bash
pnpm dev          # 运行 playground
pnpm lint         # ESLint 校验
pnpm test         # 单元 + e2e 测试
pnpm build        # 完整构建流程
```



<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@web-baseline/nuxt-css-layer/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[npm-downloads-src]: https://img.shields.io/npm/dm/@web-baseline/nuxt-css-layer.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[license-src]: https://img.shields.io/npm/l/@web-baseline/nuxt-css-layer.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@web-baseline/nuxt-css-layer

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
