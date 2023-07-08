// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop(...args) {}
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
