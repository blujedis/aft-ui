// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export function noop(...args) { }
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
export function debounce(func, delay = 200) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
/**
 * Converts a boolean to a mapped key value.
 *
 * @param value the boolean value to map to key.
 */
export function boolToMapValue(value) {
    if (value === true)
        return 'true';
    if (value === false)
        return 'false';
    if (typeof value === 'string')
        return value;
    return undefined;
}
