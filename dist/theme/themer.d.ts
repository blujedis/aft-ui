import { type ClassNameValue } from 'tailwind-merge';
import classnames from 'classnames';
import type { PropsWithoutPrefix, ThemeConfig, ThemeOption, ThemeOptions } from '../types/theme';
type PrimitiveBase = boolean | string | number | undefined | null;
type Primitive = PrimitiveBase | Record<string, any> | PrimitiveBase[];
export interface ThemerApi<C extends ThemeConfig> {
    /**
     * Adds an option to themed classes to be compiled.
     *
     * @param key the option key to be add.
     * @param prop the property of the above key to be applied.
     * @param when if value is truthy add value otherwise reject.
     */
    option<K extends ThemeOption>(key: K, prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined, when: Primitive): ThemerApi<C>;
    /**
     * Adds an option to themed classes to be compiled.
     *
     * @param key the option key to be add.
     * @param prop the property of the above key to be applied.
     * @param variant option contains nested variants.
     * @param when if value is truthy add value otherwise reject.
     */
    option<K extends ThemeOption, P extends keyof ThemeOptions[K]>(key: K, prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined, variant: PropsWithoutPrefix<keyof ThemeOptions[K][P], '$'>, when: Primitive): ThemerApi<C>;
    bundle<K extends ThemeOption, P extends keyof ThemeOptions[K]>(keys: K[], prop: PropsWithoutPrefix<P, '$'> | undefined, when: Primitive): ThemerApi<C>;
    bundle<K extends ThemeOption, P extends keyof ThemeOptions[K]>(keys: K[], extend: Record<string, any>, prop: PropsWithoutPrefix<P, '$'> | undefined, when: Primitive): ThemerApi<C>;
    /**
     * Removes class strings, called ONLY after classnames() is called
     * and before Tailwind Merge if enabled.
     *
     * @param classes tailwind class strings to be removed.
     * @param when if the value is truth otherwise reject.
     */
    remove(classes: string | string[], when: Primitive): ThemerApi<C>;
    /**
     * Prepends value before options base, and themed colors.
     *
     * @param arg the value to be appended.
     * @param when if value is truthy add value otherwise reject.
     */
    prepend(arg: ClassNameValue, when: Primitive): ThemerApi<C>;
    /**
     * Appends value after options base, and themed colors.
     *
     * @param arg the value to be appended.
     * @param when if value is truthy add value otherwise reject.
     */
    append(arg: ClassNameValue, when: Primitive): ThemerApi<C>;
    /**
     * Compiles all classes returning single output string.
     *
     * @param withTailwindMerge when true (default) Tailwind Merge dedupes classes.
     */
    compile(withTailwindMerge?: boolean): string;
    classes(): {
        base: string[];
        themed: string[];
        removed: string[];
        prepended: classnames.ArgumentArray;
        appended: classnames.ArgumentArray;
    };
}
export type ThemerInstance<C extends ThemeConfig> = {
    /**
     * Creates a new instance for generating themes.
     *
     * @param instanceName simply gives you a reference in console on where the Themer failed.
     */
    create: (instanceName: string) => ThemerApi<C>;
};
export declare function themer<C extends ThemeConfig>(themeConfig: C): {
    create: (instanceName?: string) => ThemerApi<C>;
};
export {};
