import { resolve, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt',
    '../src/module',
  ],
  cssLayer: {
    sfcIncludes: (path) => {
      const r = relative(dirname(fileURLToPath(import.meta.url)), resolve(path));
      return /^(?!node_modules\/)(?!\.nuxt\/)(?!virtual:).*/.test(r);
    },
    rules: [
      {
        includes: /^node_modules\/element-plus/,
        layerName: 'element-plus',
      },
    ],
    cssLayerOrder: ['element-plus', 'app'],
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-01-15',
});
