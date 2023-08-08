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
 * Removes undefined values.
 *
 * @param obj the object to be cleaned.
 */
export function cleanObj(obj = {}) {
    return Object.entries(obj).reduce((a, [key, val]) => {
        if (typeof val !== 'undefined')
            a[key] = val;
        return a;
    }, {});
}
export function debounce(func, delay = 200) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}
