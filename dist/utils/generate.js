import { getProperty } from 'dot-prop';
const defaultColorMap = {
    default: 'frame',
    dark: 'frame',
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    danger: 'danger',
    warning: 'warning',
    success: 'success',
    info: 'info'
};
const defaultModifiers = [
    'text',
    'bg',
    'fill',
    'stroke',
    'ring',
    'border',
    'outline',
    'even:bg',
    'odd:bg',
    'hover:ring',
    'group-hover:ring',
    'aria-selected:ring',
    'aria-current:ring',
    'aria-expanded:ring',
    'focus:ring',
    'focus-visible:ring',
    'focus-within:ring',
    'peer-focus:ring',
    'group-focus:ring',
    'group-focus-within:ring',
    'placeholder:text',
    'placeholder:bg',
    'divide'
];
export const defaultTokens = {
    solid: {
        default: ['frame-200', 'frame-600'],
        dark: ['frame-500', 'frame-800'],
        primary: 500,
        secondary: 500,
        tertiary: 500,
        danger: 500,
        warning: 500,
        success: 500,
        info: 500
    },
    muted: {
        default: ['frame-400', 'frame-500'],
        dark: ['frame-400', 'frame-500'],
        primary: 300,
        secondary: 300,
        tertiary: 300,
        danger: 300,
        warning: 300,
        success: 300,
        info: 300
    },
    dim: {
        default: 'frame-200',
        dark: 'frame-500',
        primary: [100, 600],
        secondary: [100, 600],
        tertiary: [100, 600],
        danger: [100, 600],
        warning: [100, 600],
        success: [100, 600],
        info: [100, 600]
    },
    soft: {
        default: 'frame-50',
        dark: 'frame-100/90',
        primary: 50,
        secondary: 50,
        tertiary: 50,
        danger: 50,
        warning: 50,
        success: 50,
        info: 50
    },
    ghost: {
        default: ['frame-200/50', 'frame-500/50'],
        dark: ['frame-700/50', 'frame-700/50'],
        primary: '500/50',
        secondary: '500/50',
        tertiary: '500/50',
        danger: '500/50',
        warning: '500/50',
        success: '500/50',
        info: '500/50'
    }
};
function createLabel(modifier) {
    const mod = modifier.split(':');
    const type = mod.pop()?.split('-')[0];
    if (!type)
        throw new Error(`Failed to create token group label using modifier ${modifier}`);
    const suffix = mod.map((v) => v.charAt(0).toUpperCase() + v.slice(1)).join('');
    return type + suffix;
}
/**
 * Ensures the token configuration is a valid object
 * Configurations may reference other configurations
 * to limit verbosity.
 *
 * @param tokens the initial token configuration map.
 * @param obj the string or object to be normalized.
 */
function ensureConfig(tokens, obj) {
    if (typeof obj === 'string')
        return ensureConfig(tokens, getProperty(tokens, obj));
    return obj;
}
export function parseTokens(tokens, colors = defaultColorMap) {
    function normalizeToken(value, color) {
        if (!value)
            return null;
        // if value contains dot notation get property value
        // by using getter, then recurse.
        if (typeof value === 'string' && value.includes('.'))
            return normalizeToken(getProperty(tokens, value), color);
        // value is css variable
        // first segment of css var must match tailwind
        // type such as --text-, --bg-, --border-
        // ex: --text-myvar.
        if (typeof value === 'string' && value.startsWith('--')) {
            const type = value.replace(/^--/, '').split('-')[0];
            return `${type}-[color:var(${value})]`;
        }
        // value is numeric color level, combine with color.
        if (typeof value === 'number' && color)
            return `${colors[color]}-${value}`;
        return null;
    }
    function getTuple(value, color) {
        if (Array.isArray(value)) {
            const light = normalizeToken(value[0], color);
            const dark = normalizeToken(value[1], color);
            return [light, dark];
        }
        const light = normalizeToken(value, color);
        return [light, null];
    }
    const result = {};
    for (const [key, conf] of Object.entries(tokens)) {
        const nConf = ensureConfig(tokens, conf);
        for (const mod of defaultModifiers) {
            const collection = {};
            for (const [color, token] of Object.entries(nConf)) {
                const [light, dark] = getTuple(token, color);
                let str = '';
                if (light)
                    str += mod + ':' + light;
                if (dark)
                    str += 'dark:' + (mod + ':' + dark);
                collection[color] = str;
            }
            const group = createLabel(mod) + (key.charAt(0).toUpperCase() + key.slice(1));
            result[group] = collection;
        }
    }
    return result;
}
// function normalizeTuple<T, U>(value?: T | [T, (T | U)?]): [T?, (T | U)?] {
// 	if (typeof value === 'undefined' || value === null || (Array.isArray(value) && !value.length))
// 		return [];
// 	if (!Array.isArray(value))
// 		return [value];
// 	return value;
// }
