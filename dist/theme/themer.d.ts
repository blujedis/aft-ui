import classnames from 'classnames';
import type { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';
export interface ThemerApi<C extends ThemeConfig> {
    variant<N extends keyof C['components'], V extends keyof C['components'][N]>(name: N, variant?: V, when?: Primitive): ThemerApi<C>;
    variant<N extends keyof C['components'], V extends keyof C['components'][N]>(name: N, variant?: V, theme?: ThemeColor, when?: Primitive): ThemerApi<C>;
    option<K extends ThemeOption>(key: K, prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined, when: Primitive): ThemerApi<C>;
    mapped<T extends Record<string, unknown>, K extends Path<T>>(obj: T, key: K, when: Primitive): ThemerApi<C>;
    remove(classes: string | string[], when: Primitive): ThemerApi<C>;
    append(arg: ClassNameValue, when: Primitive): ThemerApi<C>;
    compile(withTailwindMerge?: boolean): string;
    classes(): {
        base: string[];
        themed: string[];
        removed: string[];
        appended: classnames.ArgumentArray;
    };
}
export type ThemerInstance<C extends ThemeConfig> = {
    create: (instanceName?: string) => ThemerApi<C>;
};
import type { PropsWithoutPrefix, ThemeConfig, ThemeOption, ThemeOptions, ThemeColor, Path } from '../types/theme';
type Primitive = boolean | string | number | undefined | Primitive[];
/**
 * Simple string formatter that replaces values by positional order of arguments matched.
 *
 * @param template the template to be formatted
 * @param token the token to search for ex: {{theme}}
 * @param args the positional arguments to replace tokens with.
 */
export declare function formatter(template: string, token: string, ...args: any[]): string;
export declare function themer<C extends ThemeConfig>(themeConfig: C): ThemerInstance<C>;
export declare namespace themer {
    var join: (...classes: (string | string[])[]) => string;
    var merge: (...classes: ClassNameValue[]) => string;
    var format: typeof formatter;
    var includes: (source: Primitive | Primitive[], values: Primitive | Primitive[]) => boolean;
}
export {};
