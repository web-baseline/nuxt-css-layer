import { defineNuxtModule, addVitePlugin, addServerPlugin, addTemplate } from '@nuxt/kit';
import WrapUpLayer, { type PluginOptions as PostcssWrapUpLayerOptions } from '@web-baseline/postcss-wrap-up-layer';
import VueStyleLayer, { type PluginOptions as VueStyleLayerOptions } from '@web-baseline/vite-plugin-vue-style-layer';

export interface ModuleOptions {
  sfc: boolean;
  sfcIncludes?: VueStyleLayerOptions['includes'];
  rules: PostcssWrapUpLayerOptions['rules'];
  ignoreOnlyComments?: PostcssWrapUpLayerOptions['ignoreOnlyComments'];
  cssLayerOrder?: string | string[];
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-css-layer',
    configKey: 'cssLayer',
  },
  defaults: {
    sfc: true,
    rules: [],
  },
  setup (options) {
    if (options.rules.length > 0) {
      addVitePlugin({
        name: 'vite-plugin-nuxt-css-layer--postcss',
        config: () => ({
          css: {
            postcss: {
              plugins: [
                WrapUpLayer({
                  rules: options.rules,
                  ignoreOnlyComments: options.ignoreOnlyComments,
                }),
              ],
            },
          },
        }),
      });
    }
    if (options.sfc) {
      addVitePlugin(VueStyleLayer({
        includes: options.sfcIncludes,
      }));
    }
    if (options.cssLayerOrder) {
      const plugin = addTemplate({
        filename: 'nuxt-css-layer/css-layers.ts',
        getContents: () => `import { defineNitroPlugin } from 'nitropack/runtime';

export const layers = ${
  Array.isArray(options.cssLayerOrder)
  ? JSON.stringify(options.cssLayerOrder)
  : JSON.stringify(options.cssLayerOrder!.split(',').map((layer) => layer.trim()).filter((layer) => layer.length > 0))
};

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.head.unshift(\`<style>@layer \${layers.join(', ')};</style>\`);
  });
});\n`,
        write: true,
      });
      addServerPlugin(plugin.dst);
    }
  },
});
