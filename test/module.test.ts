import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ModuleOptions } from '../src/module';

const {
  addVitePlugin,
  addServerPlugin,
  addTemplate,
  wrapUpLayer,
} = vi.hoisted(() => ({
  addVitePlugin: vi.fn(),
  addServerPlugin: vi.fn(),
  addTemplate: vi.fn(),
  wrapUpLayer: vi.fn((options) => ({ name: 'mock-wrap-up-layer', options })),
}));

vi.mock('@nuxt/kit', () => ({
  defineNuxtModule: (moduleOptions: unknown) => moduleOptions,
  addVitePlugin,
  addServerPlugin,
  addTemplate,
}));

vi.mock('@web-baseline/postcss-wrap-up-layer', () => ({
  default: wrapUpLayer,
}));

describe('module setup', () => {
  const loadModule = async () => {
    const loaded = await import('../src/module');
    return loaded.default as unknown as { setup: (opts: ModuleOptions) => void };
  };

  const runSetup = async (options: ModuleOptions) => {
    const module = await loadModule();
    module.setup(options);
  };

  beforeEach(() => {
    vi.resetModules();
    addVitePlugin.mockReset();
    addServerPlugin.mockReset();
    addTemplate.mockReset();
    wrapUpLayer.mockReset();
    wrapUpLayer.mockImplementation((options) => ({ name: 'mock-wrap-up-layer', options }));
  });

  it('should register importQuery plugin and resolve layer from query', async () => {
    await runSetup({
      importQuery: true,
      rules: [],
    });

    expect(wrapUpLayer).toHaveBeenCalledTimes(1);
    const importQueryOptions = wrapUpLayer.mock.calls[0]?.[0] as {
      rules: Array<{ map: (relativeId: string) => string | false }>;
    };

    expect(importQueryOptions.rules[0]?.map('/foo.css?layer=app')).toBe('app');
    expect(importQueryOptions.rules[0]?.map('/foo.css')).toBe(false);
    expect(importQueryOptions.rules[0]?.map('/foo.css?type=style')).toBe(false);

    expect(addVitePlugin).toHaveBeenCalledTimes(1);
    const vitePlugin = addVitePlugin.mock.calls[0]?.[0] as { config: () => { css: { postcss: { plugins: unknown[] } } } };
    expect(vitePlugin.config().css.postcss.plugins).toHaveLength(1);
  });

  it('should register rules plugin and pass ignoreOnlyComments', async () => {
    const rules = [{ includes: /node_modules/, layerName: 'vendor' }];

    await runSetup({
      importQuery: false,
      rules,
      ignoreOnlyComments: true,
    });

    expect(wrapUpLayer).toHaveBeenCalledTimes(1);
    expect(wrapUpLayer).toHaveBeenCalledWith({
      rules,
      ignoreOnlyComments: true,
    });
    expect(addVitePlugin).toHaveBeenCalledTimes(1);
    expect(addTemplate).not.toHaveBeenCalled();
  });

  it('should register both plugins when importQuery and rules are enabled', async () => {
    const rules = [{ includes: /foo/, layerName: 'foo' }];

    await runSetup({
      importQuery: true,
      rules,
    });

    expect(wrapUpLayer).toHaveBeenCalledTimes(2);
    expect(addVitePlugin).toHaveBeenCalledTimes(1);

    const vitePlugin = addVitePlugin.mock.calls[0]?.[0] as { config: () => { css: { postcss: { plugins: unknown[] } } } };
    expect(vitePlugin.config().css.postcss.plugins).toHaveLength(2);
  });

  it('should not register vite plugin when no postcss plugins are enabled', async () => {
    await runSetup({
      importQuery: false,
      rules: [],
    });

    expect(wrapUpLayer).not.toHaveBeenCalled();
    expect(addVitePlugin).not.toHaveBeenCalled();
    expect(addTemplate).not.toHaveBeenCalled();
    expect(addServerPlugin).not.toHaveBeenCalled();
  });

  it('should generate server plugin template from cssLayerOrder string', async () => {
    addTemplate.mockReturnValue({ dst: '/virtual/nuxt-css-layer/css-layers.ts' });

    await runSetup({
      importQuery: false,
      rules: [],
      cssLayerOrder: 'base, element-plus, app, ',
    });

    expect(addTemplate).toHaveBeenCalledTimes(1);
    const templateOptions = addTemplate.mock.calls[0]?.[0] as { getContents: () => string; write: boolean };
    const content = templateOptions.getContents();

    expect(templateOptions.write).toBe(true);
    expect(content).toContain('export const layers = ["base","element-plus","app"]');
    expect(addServerPlugin).toHaveBeenCalledWith('/virtual/nuxt-css-layer/css-layers.ts');
  });

  it('should keep array order when cssLayerOrder is array', async () => {
    addTemplate.mockReturnValue({ dst: '/virtual/nuxt-css-layer/css-layers.ts' });

    await runSetup({
      importQuery: false,
      rules: [],
      cssLayerOrder: ['a', 'b'],
    });

    const templateOptions = addTemplate.mock.calls[0]?.[0] as { getContents: () => string };
    expect(templateOptions.getContents()).toContain('export const layers = ["a","b"]');
  });

  it('should not register server plugin when cssLayerOrder is empty string', async () => {
    await runSetup({
      importQuery: false,
      rules: [],
      cssLayerOrder: '',
    });

    expect(addTemplate).not.toHaveBeenCalled();
    expect(addServerPlugin).not.toHaveBeenCalled();
  });
});
