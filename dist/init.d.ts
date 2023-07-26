import { type Writable } from 'svelte/store';
import type { DeepPartial, ThemeConfig, ThemeDefaults } from './types/theme';
import * as options from './components/options';
import * as components from './components/configs';
export type ThemeStore<T> = Omit<Writable<T>, 'update'> & {
    get(): T;
    update(theme: DeepPartial<T>): void;
};
export declare const themeStore: ThemeStore<{
    options: typeof options;
    defaults: ThemeDefaults;
    components: typeof components;
    palette: {
        default: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        primary: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        secondary: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        tertiary: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        danger: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        warning: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        success: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        info: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
    };
}>;
/**
 * Creates a new store which updates the default store's components and options when changed.
 *
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export declare function createStore<T extends Record<string, unknown> & DeepPartial<ThemeConfig>>(extendTheme: T, baseTheme?: {
    options: typeof options;
    defaults: ThemeDefaults;
    components: typeof components;
    palette: {
        default: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        primary: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        secondary: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        tertiary: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        danger: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        warning: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        success: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
        info: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            '950': string;
            DEFAULT: string;
        };
    };
}): ThemeStore<T & ThemeConfig>;
