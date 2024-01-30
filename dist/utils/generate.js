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
const focusModifiers = [
    'focus:outline',
    'focus-visible:outline',
    'focus-within:outline',
    'peer-focus:outline',
    'group-focus:outline',
    'group-focus-within:outline'
];
const placeholder = {
    $base: '',
    default: '',
    dark: '',
    primary: '',
    secondary: '',
    tertiary: '',
    danger: '',
    warning: '',
    success: '',
    info: ''
};
const getDefaultTokens = () => {
    return {
        filled: {
            default: {
                modifiers: {
                    text: ['text'],
                    container: ['bg', 'stroke', 'fill', 'even:bg', 'odd:bg']
                },
                text: {
                    ...placeholder,
                    $base: 'text-white',
                    default: ['text-current', 'text-white']
                },
                container: {
                    default: ['frame-200', 'frame-600'],
                    dark: ['frame-600', 'black'],
                    primary: 500,
                    secondary: 500,
                    tertiary: 500,
                    danger: 500,
                    warning: 500,
                    success: 500,
                    info: 500
                }
            },
            selected: {
                modifiers: {
                    text: ['aria-selected:text', 'aria-expanded:text', 'aria-current:text'],
                    container: [
                        'aria-selected:bg',
                        'aria-expanded:bg',
                        'aria-current:bg',
                        'dark:aria-selected:bg',
                        'dark:aria-expanded:bg',
                        'dark:aria-current:bg'
                    ]
                },
                text: {
                    ...placeholder,
                    $base: 'text-white'
                },
                container: extend('filled.default.container', {
                    $base: {
                        $base: 'bg-gray-100 dark:bg-frame-800 aria-expanded:text-white',
                        default: 'aria-expanded:text-current'
                    }
                })
                // container: {
                // 	$base: {
                // 		$base: 'bg-gray-100 dark:bg-frame-800 aria-expanded:text-white',
                // 		default: 'aria-expanded:text-current'
                // 	},
                // 	default: ['frame-200', 'frame-600'],
                // 	dark: ['frame-600', 'frame-950'],
                // 	primary: [500,500],
                // 	secondary: [500,500],
                // 	tertiary: [500,500],
                // 	danger: [500,500],
                // 	warning: [500,500],
                // 	success: [500,500],
                // 	info: [500,500],
                // }
            }
        },
        outlined: {
            default: {
                modifiers: {
                    text: ['text'],
                    container: ['outline', 'ring', 'border']
                },
                text: {
                    ...placeholder,
                    default: ['text-current', 'text-current'],
                    dark: ['text-current', 'text-current'],
                    primary: [500, 400],
                    secondary: [500, 400],
                    tertiary: [500, 400],
                    danger: [500, 400],
                    warning: [500, 400],
                    success: [500, 400],
                    info: [500, 400]
                },
                container: 'filled.default.container'
            }
        },
        ghost: {
            default: {
                modifiers: {
                    text: ['text'],
                    container: []
                },
                text: 'outlined.default.text',
                container: {
                    default: ['primary-500/30', 'primary-500/40'],
                    dark: ['primary-500/30', 'primary-500/40'],
                    primary: ['500/40', '500/40'],
                    secondary: ['500/40', '500/40'],
                    tertiary: ['500/40', '500/40'],
                    danger: ['500/40', '500/40'],
                    warning: ['500/40', '500/40'],
                    success: ['500/40', '500/40'],
                    info: ['500/40', '500/40']
                }
            },
            hover: {
                modifiers: {
                    text: [],
                    container: ['hover:bg']
                },
                text: {},
                container: {
                    default: ['frame-200/80', 'frame-500/50'],
                    dark: ['frame-600/40', 'frame-950/80'],
                    primary: ['500/20', '500/40'],
                    secondary: ['500/20', '500/40'],
                    tertiary: ['500/20', '500/40'],
                    danger: ['500/20', '500/40'],
                    warning: ['500/20', '500/40'],
                    success: ['500/20', '500/40'],
                    info: ['500/20', '500/40']
                }
            },
            focus: {
                modifiers: {
                    text: [],
                    container: [...focusModifiers]
                },
                alias: {
                    container: ['filled', 'outlined'] // will generate focus for these also.
                },
                text: {},
                container: 'ghost.hover.container'
            }
        }
    };
};
export const defaultTokens = getDefaultTokens();
function extend(path, ...obj) {
    const existing = typeof path === 'string'
        ? getConfig(defaultTokens, getProperty(defaultTokens, path)) || {}
        : {};
    const next = obj.shift() || {};
    if (obj.length)
        return extend({ ...existing, ...next }, ...obj);
    return { ...existing, ...next };
}
function createLabel(modifier) {
    const mod = modifier.split(':');
    const type = mod.pop()?.split('-')[0];
    if (!type)
        throw new Error(`Failed to create token group label using modifier ${modifier}`);
    const suffix = mod
        .reduce((a, c) => {
        const split = c.split('-');
        return [...a, ...split];
    }, [])
        .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
        .join('');
    return type.charAt(0).toUpperCase() + type.slice(1) + suffix;
}
function createResult(name, content) {
    return `export const ${name} = {\n${content.join(',\n')}\n};`;
}
function createAlias(name, alias) {
    return `export const ${alias} = ${name};`;
}
function isArbitrary(value) {
    if (value.startsWith('--'))
        return true;
    return ['#', 'rgb', 'rgba', 'hsl', 'hsla'].some((v) => value.includes(v));
}
/**
 * Ensures the token configuration is a valid object
 * Configurations may reference other configurations
 * to limit verbosity.
 *
 * @param tokens the initial token configuration map.
 * @param obj the string or object to be normalized.
 */
function getConfig(tokens, obj) {
    if (typeof obj === 'function')
        obj = obj();
    if (typeof obj === 'string')
        return getConfig(tokens, getProperty(tokens, obj));
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
        // Css var or rgb, hsl, hex color
        // ex: --theme-color-primary or #FF0000 or rgba(0,0,0,0.3)
        if (typeof value === 'string' && isArbitrary(value)) {
            // const type = value.replace(/^--/, '').split('-')[0];
            return value.startsWith('--') ? `[color:var(${value})]` : `[${value}]`;
        }
        // value is numeric color level or color level with opacity modifier, combine with color.
        // ex: 500 or '500/50';
        if ((typeof value === 'number' ||
            (typeof value === 'string' && value.includes('/') && !value.includes('-'))) &&
            color)
            return `${colors[color]}-${value}`;
        if (typeof value === 'string')
            return value;
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
    function buildClass(modifier, conf) {
        if (!conf)
            return [];
        const { $base, ...nConf } = getConfig(tokens, conf);
        const result = [];
        const extend = (typeof $base === 'string' ? { $base } : $base || {});
        if (extend.$base)
            result.push(`  ${'$base'}: '${extend.$base}'`);
        for (const [color, token] of Object.entries(nConf)) {
            const [light, dark] = getTuple(token, color);
            let str = '';
            if (light)
                str += !light.includes(':') ? modifier + '-' + light : ' ' + light;
            if (dark)
                str += !dark.includes(':') ? ' dark:' + (modifier + '-' + dark) : ' ' + dark;
            if (extend[color])
                str = extend[color] + ' ' + str;
            result.push(`  ${color}: '${str}'`);
        }
        return result;
    }
    const result = {};
    const resultAliases = {};
    const keys = [];
    for (const [gKey, gConf] of Object.entries(tokens)) {
        // iterate each variant in group.
        for (const [, sConf] of Object.entries(gConf)) {
            // iterate each state in group.
            const { modifiers: modifiersMap, alias, variant, ...items } = getConfig(tokens, sConf);
            for (const [iKey, iConf] of Object.entries(items)) {
                const modifiers = modifiersMap[iKey] || []; // get modifier collection.
                const aliases = ((alias || {})[iKey] || []);
                for (const m of modifiers) {
                    const str = buildClass(m, iConf); // generate the Tailwind class prefixed with modifier.
                    if (!str.length)
                        continue;
                    const suffix = createLabel(m);
                    const name = gKey.toLowerCase() + suffix; // create object name.
                    if (keys.includes(name))
                        throw new Error(`Detected duplicate generated key name ${name}.`);
                    keys.push(name); // save key name check for previously generated object names.
                    // result.push(`export const ${name} = {\n${str.join(',\n')}\n};`); // apply contents to object.
                    result[name] = createResult(name, str);
                    aliases.forEach((a) => {
                        const aName = a.toLowerCase() + suffix;
                        if (keys.includes(aName))
                            throw new Error(`Detected duplicate generated key/alias name ${aName}.`);
                        resultAliases[aName] = createAlias(name, aName); // createResult(aName, str);
                    });
                }
            }
        }
    }
    const resultMap = Object.keys(result)
        .sort()
        .map((k) => result[k]);
    const aliasesMap = Object.keys(resultAliases)
        .sort()
        .map((k) => resultAliases[k]);
    return [...resultMap, ...aliasesMap].join('\n\n');
}
// selected: {
// 	...placeholder,
// 	$base: 'aria-selected:saturate-150 aria-expanded:saturate-150 aria-current:saturate-150'
// }
// SOFT
// 		default: 'frame-50',
// 		dark: 'frame-100/90',
// 		primary: 50,
// 		secondary: 50,
// 		tertiary: 50,
// 		danger: 50,
// 		warning: 50,
// 		success: 50,
// 		info: 50
// DIM
// 		default: 'frame-200',
// 		dark: 'frame-500',
// 		primary: [100, 600],
// 		secondary: [100, 600],
// 		tertiary: [100, 600],
// 		danger: [100, 600],
// 		warning: [100, 600],
// 		success: [100, 600],
// 		info: [100, 600]
// MUTED
// 		default: ['frame-400', 'frame-500'],
// 		dark: ['frame-400', 'frame-500'],
// 		primary: [300, 700],
// 		secondary: [300, 700],
// 		tertiary: [300, 700],
// 		danger: [300, 700],
// 		warning: [300, 700],
// 		success: [300, 700],
// 		info: [300, 700],
// 'placeholder:text',
// 'placeholder:bg',
// 'divide'
// 'focus:ring',
// 'focus-visible:ring',
// 'focus-within:ring',
// 'aria-selected:ring',
// 'aria-current:ring',
// 'aria-expanded:ring',
// 'aria-selected:outline',
// 'aria-current:outline',
// 'aria-expanded:outline',
// 'bg',
// 'fill',
// 'stroke',
// 'ring',
// 'border',
// 'outline',
// 'even:bg',
// 'odd:bg',
