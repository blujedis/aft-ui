import { type Writable } from 'svelte/store';
import type { DeepPartial, ThemeConfig, ThemeDefaults } from '../types/theme';
import * as defaultOptions from '../components/options';
import * as defaultComponents from '../components/configs';
export type ThemeStore<T> = Omit<Writable<T>, 'update'> & {
    get(): T;
    update(theme: DeepPartial<T>): void;
};
export declare const themeStore: ThemeStore<{
    options: typeof defaultOptions;
    defaults: ThemeDefaults;
    components: typeof defaultComponents;
}>;
/**
 * Creates a new store which updates the default store's components and options when changed.
 *
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export declare function createStore<T extends Record<string, unknown> & DeepPartial<ThemeConfig>>(extendTheme: T, baseTheme?: {
    options: typeof defaultOptions;
    defaults: ThemeDefaults;
    components: typeof defaultComponents;
}): ThemeStore<T & ThemeConfig>;
