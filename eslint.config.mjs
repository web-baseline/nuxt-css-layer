// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import stylistic from '@stylistic/eslint-plugin';

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: [
      './playground',
    ],
  },
}).append(
  stylistic.configs.customize({
    flat: true,
    semi: true,
    arrowParens: true,
    braceStyle: '1tbs',
  }),
  {
    rules: {
      'no-useless-computed-key': ['error'],
      'no-console': ['warn'],
      '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true }],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      '@stylistic/function-call-spacing': ['error'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
          },
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 5 },
          multiline: { max: 5 },
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
      'vue/multi-word-component-names': ['error', {
        ignores: [
          'index',
        ],
      }],
    },
  },
);
