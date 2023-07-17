import { twMerge } from 'tailwind-merge';
import type { Path, ThemeColor, ThemeColorShade, TypeOrValue } from '../types';

import { tailwindcolors, namedcolors } from './palettes';
import { getProperty } from 'dot-prop';
import { prefixes as colorPrefixes } from './constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const getProperty = (...args: any[]) => '';

export type StringMap = Record<string, string | string[]>;
export type MergeConfigPredicate = (value: string) => string;

/**
 * If undefined empty array is returned otherwise the array or value wrapped as array is.
 *
 * @param value the value to inspect as any array.
 */
export function ensureArray<T = any>(value?: null | T | T[]) {
	if (typeof value === 'undefined' || value === null) [] as T[];
	if (Array.isArray(value)) return value as T[];
	return [value] as T[];
}

const tailwindKeys = Object.keys(tailwindcolors);
const namedKeys = Object.keys(namedcolors);

/**
 * Checks if color looks like css color.
 *
 * @param color the possible css color to inspect.
 */
export function isCssColor(color: string) {
	const prefixes = ['#', 'rgb', 'rgba', 'hsl', 'hwb', 'currentColor'];
	return prefixes.some((p) => color.startsWith(p));
}

/**
 * Checks if value is a Tailwind color.
 *
 * @param color the color to eval as Tailwind color.
 */
export function isTailwindColor(color: string) {
	return tailwindKeys.includes(color);
}

/**
 * Checks if value is an app color from palette.
 *
 * @param color the color to eval as App color.
 */
export function isAppColor(palette: Record<string, Record<string, string>>, color: string) {
	return Object.keys(palette).includes(color);
}

/**
 * Checks if value is a known css color.
 *
 * @param color color the color to eval as css color.
 */
export function isNamedColor(color: string) {
	return namedKeys.includes(color);
}

/**
 * Parses a Tailwind path into parts, modifiers, prefix and color.
 *
 * @example
 * const parsed = parseClass('hover:bg-primary-500');
 * parsed = { modifiers: ['hover'], prefix: 'bg', color: ['primary', '500'] };
 *
 * @param path the class path to be parsed.
 */
export function parseClass(path: string) {
	let modifiers = [] as string[];
	if (path.includes(':')) {
		const idx = path.lastIndexOf(':');
		if (~idx) {
			modifiers = path.slice(0, idx).split(':');
			path = path.slice(idx + 1);
		}
	}
	path = path.replace(/(-|\.)/g, '.');
	let color = path.split('.') as [ThemeColor, ThemeColorShade | undefined, string];
	let prefix = '';
	if (colorPrefixes.includes(color[0] as any)) {
		prefix = (color.shift() || '') as string;
		if (color[1] === ('DEFAULT' as any)) color[1] = 500;
	}
	color = color.filter((v) => !!v) as [ThemeColor, ThemeColorShade | undefined, string];
	if (!color[1]) color[1] = undefined;
	const namespace = color[1]
		? `${color[0]}.${color[1]}`
		: ['white', 'black', 'transparent', 'current', 'inherit'].includes(color[0])
		? color[0]
		: `${color[0]}.500`; // if no shade set to 500 if not white, black, current...etc.
	color[2] = namespace;
	return {
		modifiers,
		prefix,
		color,
		namespace
	};
}

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
export function classToColorPath(path: string) {
	return parseClass(path).namespace;
}

/**
 * Returns a tuple with color name and shade if any.
 *
 * @param path the color class to be parsed.
 */
export function classToColorSegments(path: string) {
	const { color } = parseClass(path);
	return color;
}

/**
 * Normalizes the color value returning the normalized hex, rgb, hsl color.
 *
 * @param palette the user defined color palette.
 * @param value a tailwind color, named color, theme color or defined color.
 */
export function classToColor(
	palette: Record<string, Record<string, string>>,
	value: string
): string {
	if (isCssColor(value)) return value;
	if (isNamedColor(value)) return namedcolors[value as keyof typeof namedcolors];
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [color, shade, namespace] = classToColorSegments(value);
	if (isAppColor(palette, color)) return getProperty(palette, namespace) as unknown as string;
	else if (isTailwindColor(color as string)) return getProperty(tailwindcolors, namespace);
	return value;
}

/**
 * Picks a value using dot notation path.
 *
 * @param props an object containing properties and values.
 * @param key the dot notation key to pick.
 */
export function pickProp<P extends Record<string, any>>(props: P, key: TypeOrValue<Path<P>>) {
	return getProperty(props, key as string) || '';
}

/**
 * Merges theme configuration.
 *
 * @param target the target object to merge into.
 * @param source the source ojbect to merge from.
 * @param dedupe when true removes dupes using Tailwind Merge.
 */
export function mergeConfig<T extends StringMap, S extends StringMap>(
	target: T,
	source: S,
	dedupe?: boolean
): T & S;

/**
 * Merges theme configuration.
 *
 * @param target the target object to merge into.
 * @param source the source ojbect to merge from.
 * @param predicate an optional function for filtering results.
 * @param dedupe when true removes dupes using Tailwind Merge.
 */
export function mergeConfig<T extends StringMap, S extends StringMap>(
	target: T,
	source: S,
	predicate?: MergeConfigPredicate,
	dedupe?: boolean
): T & S;

export function mergeConfig<
	T extends Record<string, string | string[]>,
	S extends Record<string, string | string[]>
>(
	target: T,
	source = {} as S,
	dedupeOrPredicate?: boolean | MergeConfigPredicate,
	dedupe?: boolean
) {
	let predicate: MergeConfigPredicate | undefined = dedupeOrPredicate as MergeConfigPredicate;
	if (typeof dedupeOrPredicate === 'boolean') {
		dedupe = dedupeOrPredicate;
		predicate = undefined;
	}
	const cloneTarget = { ...target } as any;
	const cloneSource = { ...source };
	for (const k in cloneSource) {
		const curval = ensureArray(cloneTarget[k]).join(' ');
		const srcval = ensureArray(cloneSource[k]).join(' ');
		cloneTarget[k] = [curval, srcval].join(' ').trim();
		if (dedupe) cloneTarget[k] = twMerge(cloneTarget[k]);
		if (predicate) cloneTarget[k] = predicate(cloneTarget[k]);
	}
	return cloneTarget as T & S;
}

/**
 * Merges multiple theme configuration objects.
 *
 * @param obj1 the initial target object to merge into.
 * @param obj2 first object to merge from.
 * @param obj3 second object to merge from.
 * @param obj4 third object to merge from.
 * @param obj5 fouth object to merge from.
 */
export function mergeConfigs<
	T1 extends StringMap,
	T2 extends StringMap,
	T3 extends StringMap,
	T4 extends StringMap,
	T5 extends StringMap,
	T6 extends StringMap
>(obj1: T1, obj2: T2, obj3?: T3, obj4?: T4, obj5?: T5, obj6?: T6): T1 & T2 & T3 & T4 & T5 & T6 {
	const configs = [obj1, obj2, obj3, obj4, obj5, obj6];
	const target = configs.shift() || ({} as Record<string, string | string[]>);
	return configs.reduce((a, c) => {
		if (c) a = mergeConfig(a, c, true);
		return a;
	}, target as any);
}

// type CompileValue = string | number | boolean;
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
// export function compileTemplate(template: TemplateStringsArray, ...keys: string[]) {
//   return (data: Record<string, unknown> | CompileValue[], ...rest: CompileValue[]): string => {
//     const isArray = Array.isArray(data);
//     let clone: Record<string, unknown> | CompileValue[];
//     if (isArray)
//       clone = [...data, ...rest];
//     else if (typeof data !== 'object')
//       clone = [data, ...rest];
//     else
//       clone = { ...data };
//     const strArr = template.slice() as unknown as string[];
//     keys.forEach((k, i) => {
//       const dataVal = Array.isArray(clone) ? clone[i] : clone[k];
//       strArr[i] = strArr[i] + dataVal;
//     });
//     return strArr.join('');
//   };
// }

// declare global {
//   interface String {
//     $join: (arg: string | string[], ...args: string[]) => string;
//   }
// }

// String.prototype.$join = function (arg: string | string[], ...args: (string | string[])[]) {
//   args = ([this, arg, ...args].flat()) as string[];
//   return args.join(' ').trim();
// };
