import { twMerge } from 'tailwind-merge';
import type { Path, TypeOrValue } from '../types';
import { getProperty } from 'dot-prop';

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

interface BEMString extends String {
	state(...state: string[]): string;
}

/**
 * Generate a BEM css class.
 * 
 * @param block the main block element.
 * @param child optional child element.
 */
export function bem(block: string, child?: string) {
  const arr = [block];
  if (child)
    arr.push(child);
  const str = new String(arr.join('__')) as BEMString;
  str.state = (...state: string[]) => str + '--' + state.join('-');
  return str;
}


type CompileValue = string | number | boolean;

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
export function compileTemplate(template: TemplateStringsArray, ...keys: string[]) {
	return (data: Record<string, unknown> | CompileValue[], ...rest: CompileValue[]): string => {
		const isArray = Array.isArray(data);
		let clone: Record<string, unknown> | CompileValue[];
		if (isArray)
			clone = [...data, ...rest];
		else if (typeof data !== 'object')
			clone = [data, ...rest];
		else
			clone = { ...data };
		const strArr = template.slice() as unknown as string[];
		keys.forEach((k, i) => {
			const dataVal = Array.isArray(clone) ? clone[i] : clone[k];
			strArr[i] = strArr[i] + dataVal;
		});
		return strArr.join('');
	};
}

declare global {
	interface String {
		$join: (arg: string | string[], ...args: string[]) => string;
	}
}

String.prototype.$join = function (arg: string | string[], ...args: (string | string[])[]) {
	args = ([this, arg, ...args].flat()) as string[];
	return args.join(' ').trim();
};

