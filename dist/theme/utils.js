import { twMerge } from 'tailwind-merge';
import { getProperty } from 'dot-prop';
import { colors, shades } from '../constants/colors';
import { cleanObj } from '../utils';
/**
 * If undefined empty array is returned otherwise the array or value wrapped as array is.
 *
 * @param value the value to inspect as any array.
 */
export function ensureArray(value) {
    if (typeof value === 'undefined' || value === null)
        [];
    if (Array.isArray(value))
        return value;
    return [value];
}
/**
 * Checks if color looks like css color.
 *
 * @param color the possible css color to inspect.
 */
export function isCssColor(color) {
    const prefixes = ['#', 'rgb', 'rgba', 'hsl', 'hwb', 'currentColor'];
    return prefixes.some((p) => color.startsWith(p));
}
/**
 * Verifies that value is a known theme color.
 *
 * @param color the color to verify as theme color.
 */
export function isThemeColor(color) {
    const [name, shade] = (color || '').replace(/^(--|--color)/, '').split('-');
    const normalizedShade = typeof shade === 'undefined' ? 500 : parseInt(shade);
    const hasColor = colors.includes(name.toLowerCase());
    const hasShade = shades.includes(normalizedShade);
    if (hasShade && hasColor)
        return color;
    return null;
}
/**
 * Gets a normalized color value.
 *
 * @param color the color to normalize.
 * @param def a default fallback value.
 * @param opacity optional opacity to be applied when theme color is used.
 */
export function getColor(color, def, opacity) {
    const themeColor = isThemeColor(color);
    if (themeColor)
        return opacity
            ? `rgb(var(--color-${themeColor})/${opacity})`
            : `rgb(var(--color-${themeColor}))`;
    if (color === null || typeof color === 'undefined' || typeof color !== 'string')
        return def || '';
    return color; // we get here it's some string perhaps a named color?
}
/**
 * Picks a value using dot notation path.
 *
 * @param obj an object containing properties and values.
 * @param key the dot notation key to pick.
 */
export function pickProp(obj, key) {
    obj = obj || {};
    return getProperty(obj, key);
}
/**
 * Picks values from an object.
 *
 * @param obj the object to pick values from.
 * @param keys the keys to pick.
 */
export function pickProps(obj, key, ...keys) {
    keys = [key, ...keys];
    return (keys || []).reduce((a, c) => {
        a[c] = pickProp(obj, c);
        return a;
    }, {});
}
/**
 * Picks values from an object.
 *
 * @param obj the object to pick values from.
 * @param keys the keys to pick.
 */
export function pickCleanProps(obj, key, ...keys) {
    keys = [key, ...keys];
    return (keys || []).reduce((a, c) => {
        const val = pickProp(obj, c);
        if (typeof val !== 'undefined')
            a[c] = val;
        return a;
    }, {});
}
export function mergeConfig(target, source = {}, dedupeOrPredicate, dedupe) {
    let predicate = dedupeOrPredicate;
    if (typeof dedupeOrPredicate === 'boolean') {
        dedupe = dedupeOrPredicate;
        predicate = undefined;
    }
    const cloneTarget = { ...target };
    const cloneSource = { ...source };
    for (const k in cloneSource) {
        const curval = ensureArray(cloneTarget[k]).join(' ');
        const srcval = ensureArray(cloneSource[k]).join(' ');
        cloneTarget[k] = [curval, srcval].join(' ').trim();
        if (dedupe)
            cloneTarget[k] = twMerge(cloneTarget[k]);
        if (predicate)
            cloneTarget[k] = predicate(cloneTarget[k]);
    }
    return cloneTarget;
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
export function mergeConfigs(obj1, obj2, obj3, obj4, obj5, obj6) {
    const configs = [obj1, obj2, obj3, obj4, obj5, obj6];
    const target = configs.shift() || {};
    return configs.reduce((a, c) => {
        if (c)
            a = mergeConfig(a, c, true);
        return a;
    }, target);
}
/**
 * Generate a BEM css class.
 *
 * @param block the main block element.
 * @param child optional child element.
 */
export function bem(block, child) {
    const arr = [block];
    if (child)
        arr.push(child);
    const str = new String(arr.join('__'));
    str.state = (...state) => str + '--' + state.join('-');
    return str;
}
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
export function compileTemplate(template, ...keys) {
    return (data, ...rest) => {
        const isArray = Array.isArray(data);
        let clone;
        if (isArray)
            clone = [...data, ...rest];
        else if (typeof data !== 'object')
            clone = [data, ...rest];
        else
            clone = { ...data };
        const strArr = template.slice();
        keys.forEach((k, i) => {
            const dataVal = Array.isArray(clone) ? clone[i] : clone[k];
            strArr[i] = strArr[i] + dataVal;
        });
        return strArr.join('');
    };
}
String.prototype.$join = function (arg, ...args) {
    args = [this, arg, ...args].flat();
    return args.join(' ').trim();
};
