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
 * Simple debounce function used when submitting requests.
 *
 * @param func the callback function to be called
 * @param delay the delay to debounce (default: 200
 * ms)
 */
export function debounce<T>(func: (...args: T[]) => unknown, delay = 200): typeof func {
	let timeout: number | NodeJS.Timeout;
	return function (...args: T[]) {
		clearTimeout(timeout as number);
		timeout = setTimeout(() => func(...args), delay);
	};
}

/**
 * Converts a boolean to a mapped key value.
 *
 * @param value the boolean value to map to key.
 */
export function boolToMapValue<T = unknown>(value: T) {
	if (value === true) return 'true';
	if (value === false) return 'false';
	if (typeof value === 'string') return value as Exclude<T, true | false>;
	return undefined;
}
