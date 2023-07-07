import type { ThemeColor } from '$lib/theme/constants';
import { ensureArray } from './array';

type CompileValue = string | number | boolean;

/**
 * Compiles template literal as a template.
 * When using array keys names negligible
 * values replaced by their index.
 *
 * @example
 * const myTemplate = compileTemplate`My name is ${'name'} I'm ${'age'} years old.`;
 * const fromObject = myTemplate({ name: 'Bob', age: 25 });
 * const fromArray = myTemplate(['bob', 31]);
 *
 * @param template a string template using back ticks
 * @param keys the keys extracted from the template literal.
 */
export function compileTemplate(template: string, ...keys: string[]) {
	return (data: Record<string, unknown> | CompileValue[], ...rest: CompileValue[]): string => {
		if (data === null || typeof data === 'undefined') return template;
		const isArray = Array.isArray(data);
		let clone: Record<string, unknown> | CompileValue[];
		if (isArray) clone = [...data, ...rest];
		else if (typeof data !== 'object') clone = [data, ...rest];
		else clone = { ...data };
		const strArr = template.slice() as unknown as string[];
		keys.forEach((k, i) => {
			const dataVal = Array.isArray(clone) ? clone[i] : clone[k];
			strArr[i] = strArr[i] + dataVal;
		});
		return strArr.join('');
	};
}
