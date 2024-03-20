/**
 * Removes undefined values.
 *
 * @param obj the object to be cleaned.
 */
export function cleanObj<T extends Record<string, unknown>, K extends keyof T>(
	obj = {} as T,
	exclude = [] as K[]
): Omit<Partial<T>, K> {
	return Object.entries(obj as object).reduce((a, [key, val]) => {
		if (exclude.includes(key as K)) return a;
		if (typeof val !== 'undefined') a[key as keyof T] = val as any;
		return a;
	}, {} as Partial<T>);
}

/**
 * Converts object into simple object literal using JSON.parse, JSON.stringify.
 *
 * @param obj the object to be cloned.
 */
export function simpleClone<T>(obj: T) {
	return JSON.parse(JSON.stringify(obj));
}
