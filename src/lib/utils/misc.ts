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

export function debounce<T>(func: (...args: T[]) => unknown, delay = 200): typeof func {
	let timeout: number | NodeJS.Timeout;
	return function (...args: T[]) {
		clearTimeout(timeout as number);
		timeout = setTimeout(() => func(...args), delay);
	};
}
