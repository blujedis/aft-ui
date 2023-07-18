// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export function noop(...args: any) {}

/**
 * Generates a cheap unique ID.
 *
 * @param radix the numberic value used to convert to strings.
 */
export function uniqid(radix = 16) {
	return '#' + ((Math.random() * 0xffffff) << 0).toString(radix);
}

/**
 * Indicates DOM is ready and usable.
 */
export function DOMEnabled() {
	return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/**
 * Removes undefined values.
 *
 * @param obj the object to be cleaned.
 */
export function cleanObj<T extends Record<string, unknown>>(obj = {} as T) {
	return Object.entries(obj).reduce((a, [key, val]) => {
		if (typeof val !== 'undefined') a[key as keyof T] = val as any;
		return a;
	}, {} as Partial<T>);
}
