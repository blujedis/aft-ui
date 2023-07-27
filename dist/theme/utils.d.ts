import type { Path, TypeOrValue } from '../types';
export type StringMap = Record<string, string | string[]>;
export type MergeConfigPredicate = (value: string) => string;
/**
 * If undefined empty array is returned otherwise the array or value wrapped as array is.
 *
 * @param value the value to inspect as any array.
 */
export declare function ensureArray<T = any>(value?: null | T | T[]): T[];
/**
 * Checks if color looks like css color.
 *
 * @param color the possible css color to inspect.
 */
export declare function isCssColor(color: string): boolean;
/**
 * Checks if value is a Tailwind color.
 *
 * @param color the color to eval as Tailwind color.
 */
/**
 * Checks if value is an app color from palette.
 *
 * @param color the color to eval as App color.
 */
/**
 * Checks if value is a known css color.
 *
 * @param color color the color to eval as css color.
 */
/**
 * Parses a Tailwind path into parts, modifiers, prefix and color.
 *
 * @example
 * const parsed = parseClass('hover:bg-primary-500');
 * parsed = { modifiers: ['hover'], prefix: 'bg', color: ['primary', '500'] };
 *
 * @param path the class path to be parsed.
 */
/**
 * Converts a Tailwind color class to a dot notation path.
 *
 * @example
 * const bg = 'bg-primary-300';
 * const path = classToPath(bg); // bg.primary.300
 * const path = classToPath(bg, true); // primary.300
 *
 * @param path the path to convert to dot notation path
 * @param stripPrefix when true prefixes such as 'bg', 'text' are stripped.
 */
/**
 * Returns a tuple with color name and shade if any.
 *
 * @param path the color class to be parsed.
 */
/**
 * Normalizes the color value returning the normalized hex, rgb, hsl color.
 *
 * @param palette the user defined color palette.
 * @param value a tailwind color, named color, theme color or defined color.
 */
/**
 * Picks a value using dot notation path.
 *
 * @param props an object containing properties and values.
 * @param key the dot notation key to pick.
 */
export declare function pickProp<P extends Record<string, any>>(props: P, key: TypeOrValue<Path<P>>): string;
/**
 * Merges theme configuration.
 *
 * @param target the target object to merge into.
 * @param source the source ojbect to merge from.
 * @param dedupe when true removes dupes using Tailwind Merge.
 */
export declare function mergeConfig<T extends StringMap, S extends StringMap>(target: T, source: S, dedupe?: boolean): T & S;
/**
 * Merges theme configuration.
 *
 * @param target the target object to merge into.
 * @param source the source ojbect to merge from.
 * @param predicate an optional function for filtering results.
 * @param dedupe when true removes dupes using Tailwind Merge.
 */
export declare function mergeConfig<T extends StringMap, S extends StringMap>(target: T, source: S, predicate?: MergeConfigPredicate, dedupe?: boolean): T & S;
/**
 * Merges multiple theme configuration objects.
 *
 * @param obj1 the initial target object to merge into.
 * @param obj2 first object to merge from.
 * @param obj3 second object to merge from.
 * @param obj4 third object to merge from.
 * @param obj5 fouth object to merge from.
 */
export declare function mergeConfigs<T1 extends StringMap, T2 extends StringMap, T3 extends StringMap, T4 extends StringMap, T5 extends StringMap, T6 extends StringMap>(obj1: T1, obj2: T2, obj3?: T3, obj4?: T4, obj5?: T5, obj6?: T6): T1 & T2 & T3 & T4 & T5 & T6;
/**
 * Compiles Template String Array to reusable string with backed in formatting.
 *
 * @example
 * const compiled = compileTemplate`My name is ${'name'} I'm ${'age'} years old.`;
 * const fromObject = compiled({ name: 'Bob', age: 25 });
 * const fromArray = compiled(['Bob', 31]);
 * const fromString = compiled('Bob');
 *
 * @param template template array string using backticks.
 * @param keys the keys contained in the template array string above.
 */
