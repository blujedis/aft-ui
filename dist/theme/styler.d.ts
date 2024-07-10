import type { PropsWithoutPrefix, ThemeConfig, ThemeOption, ThemeOptions } from '../types/theme';
type Primitive = boolean | string | number | undefined | Primitive[];
/**
 * Creates a new styler instance.
 *
 * @param name the name of the styler used in errors/logging.
 */
export declare function styler<C extends ThemeConfig>(themeConfig: C): {
    create: (instanceName: string) => {
        add: (key: string, value: string | number, when: Primitive) => any;
        option: <K extends ThemeOption>(name: K, path: PropsWithoutPrefix<keyof ThemeOptions[K], "$">, key: string, when: Primitive) => any;
        color: (key: string, value: string, when: Primitive) => any;
        colormap: <T extends Record<string, any>, K extends keyof T>(obj: T, path: K, key: string, when: Primitive) => any;
        mapped: <T extends Record<string, unknown>>(obj: T, path: string, key: string, when: Primitive, asColor?: boolean) => any;
        append: (value: string, when: Primitive) => any;
        remove: (key: string, when: Primitive) => any;
        compile: () => string;
    };
};
export {};
