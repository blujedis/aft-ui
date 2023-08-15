import { type Writable } from 'svelte/store';
import type { DeepPartial, ThemeConfig } from '../types/theme';
export type ThemeStore<T> = Omit<Writable<T>, 'update'> & {
    get(): T;
    update(theme: DeepPartial<T>): void;
    defaultTheme: T;
};
/**
 * Internal store creator.
 *
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export declare function createStoreInternal<T extends ThemeConfig>({ options, defaults, components, ...rest }: DeepPartial<T>, baseTheme?: T): ThemeStore<T>;
/**
 * Creates a new store which updates the default store's components and options when changed.
 *
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export declare function createStore<T extends Record<string, unknown> & DeepPartial<ThemeConfig>>(extendTheme: T, baseTheme?: any): ThemeStore<T & ThemeConfig>;
