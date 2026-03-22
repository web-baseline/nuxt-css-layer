/* eslint-disable nuxt/nuxt-config-keys-order */
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt',
    '../src/module',
  ],
  cssLayer: {
    rules: [
      {
        includes: /^node_modules\/element-plus/,
        layerName: 'element-plus',
      },
    ],
    cssLayerOrder: ['base', 'element-plus', 'app'],
  },
  compatibilityDate: '2025-01-15',
});
