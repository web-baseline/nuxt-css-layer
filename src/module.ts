import { defineNuxtModule, addVitePlugin, addServerPlugin, addTemplate } from '@nuxt/kit';
import WrapUpLayer, { type PluginOptions as PostcssWrapUpLayerOptions } from '@web-baseline/postcss-wrap-up-layer';

export interface ModuleOptions {
  importQuery: boolean;
  rules: PostcssWrapUpLayerOptions['rules'];
  ignoreOnlyComments?: PostcssWrapUpLayerOptions['ignoreOnlyComments'];
  cssLayerOrder?: string | string[];
}

export interface QueryWithLayer {
  type?: 'script' | 'template' | 'style' | 'custom';
  layer?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-css-layer',
    configKey: 'cssLayer',
  },
  defaults: {
    importQuery: true,
    rules: [],
  },
  setup (options) {
    const plugins = [] as ReturnType<typeof WrapUpLayer>[];

    if (options.importQuery) {
      plugins.push(WrapUpLayer({
        rules: [
          {
            map: (relativeId) => {
              const [, rawQuery] = relativeId.split(`?`, 2) as [string, string?];
              const query = Object.fromEntries(new URLSearchParams(rawQuery)) as QueryWithLayer;
              if (typeof query.layer === 'string') {
                return query.layer;
              }
              return false;
            },
          },
        ],
        ignoreOnlyComments: options.ignoreOnlyComments,
      }));
    }

    if (options.rules.length > 0) {
      plugins.push(WrapUpLayer({
        rules: options.rules,
        ignoreOnlyComments: options.ignoreOnlyComments,
      }));
    }

    if (plugins.length > 0) {
      addVitePlugin({
        name: 'vite-plugin-nuxt-css-layer--postcss',
        config: () => ({
          css: {
            postcss: {
              plugins,
            },
          },
        }),
      });
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
