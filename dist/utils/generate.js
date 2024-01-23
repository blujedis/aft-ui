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
export const defaultTokens = {
    filled: {
        modifiers: {
            text: ['text'],
            fill: ['bg', 'stroke', 'fill', 'even:bg', 'odd:bg'],
            focus: [...focusModifiers]
            // hover: ['hover'],
            // selected: [], // ['aria-selected', 'aria-expanded', 'aria-current'],
        },
        text: {
            ...placeholder,
            $base: 'text-white',
            default: ['frame-800', 'frame-300'],
            dark: 'frame-300'
        },
        fill: {
            default: ['frame-200', 'frame-600'],
            dark: ['frame-600', 'frame-900'],
            primary: 500,
            secondary: 500,
            tertiary: 500,
            danger: 500,
            warning: 500,
            success: 500,
            info: 500
        },
        focus: 'ghost.focus'
        // hover: {
        // 	...placeholder,
        // 	$base: 'hover:brightness-110',
        // 	default: 'hover:brightness-105',
        // },
        // selected: {
        // 	...placeholder,
        // 	$base: 'aria-selected:saturate-150 aria-expanded:saturate-150 aria-current:saturate-150'
        // }
    },
    outlined: {
        modifiers: {
            text: ['text'],
            fill: ['outline', 'ring', 'border'],
            focus: [...focusModifiers]
            // hover: ['hover'],
            // selected: [],
        },
        text: {
            ...placeholder,
            default: ['frame-800', 'frame-300'],
            dark: ['frame-800', 'frame-300'],
            primary: [500, 400],
            secondary: [500, 400],
            tertiary: [500, 400],
            danger: [500, 400],
            warning: [500, 400],
            success: [500, 400],
            info: [500, 400]
        },
        fill: 'filled.fill',
        focus: 'ghost.focus'
        // hover: 'filled.hover',
        // selected: 'filled.selected'
    },
    ghost: {
        modifiers: {
            text: ['text'],
            fill: [],
            focus: [...focusModifiers],
            hover: ['hover:bg']
            // selected: [],
        },
        text: 'outlined.text',
        fill: {
            default: ['frame-200/80', 'frame-500/50'],
            dark: ['frame-600/30', 'frame-900/50'],
            primary: ['500/20', '500/40'],
            secondary: ['500/20', '500/40'],
            tertiary: ['500/20', '500/40'],
            danger: ['500/20', '500/40'],
            warning: ['500/20', '500/40'],
            success: ['500/20', '500/40'],
            info: ['500/20', '500/40']
        },
        focus: 'ghost.fill',
        hover: 'ghost.fill'
        // selected: 'filled.selected'
    }
    // soft: {
    // 	modifiers: {
    // 		text: ['text'],
    // 		fill: ['bg'],
    // 		focus: [...focusModifiers],
    // 		// hover: [],
    // 		// selected: [],
    // 	},
    // 	text: '',
    // 	fill: {
    // 		$base: '',
    // 		default: 'frame-50',
    // 		dark: 'frame-100/90',
    // 		primary: 50,
    // 		secondary: 50,
    // 		tertiary: 50,
    // 		danger: 50,
    // 		warning: 50,
    // 		success: 50,
    // 		info: 50
    // 	},
    // 	focus: 'ghost.focus',
    // 	// hover: 'ghost.fill',
    // 	// selected: 'filled.selected'
    // },
    // muted: {
    // 	modifiers: ['plceholder:text'],
    // 	text: {
    // 		$base: '',
    // 		default: ['frame-400', 'frame-500'],
    // 		dark: ['frame-400', 'frame-500'],
    // 		primary: [300, 700],
    // 		secondary: [300, 700],
    // 		tertiary: [300, 700],
    // 		danger: [300, 700],
    // 		warning: [300, 700],
    // 		success: [300, 700],
    // 		info: [300, 700],
    // 	}
    // },
    // dim: {
    // 	modifiers: [...defaultModifiers, 'fill', 'stroke'],
    // 	text: {},
    // 	fill: {
    // 		default: 'frame-200',
    // 		dark: 'frame-500',
    // 		primary: [100, 600],
    // 		secondary: [100, 600],
    // 		tertiary: [100, 600],
    // 		danger: [100, 600],
    // 		warning: [100, 600],
    // 		success: [100, 600],
    // 		info: [100, 600]
    // 	}
    // },
};
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
        const nConf = getConfig(tokens, conf);
        const result = [];
        for (const [color, token] of Object.entries(nConf)) {
            if (color === '$base') {
                // do not parse base styles, copy to result.
                result.push(`  ${'$base'}: '${token}'`);
            }
            else {
                const [light, dark] = getTuple(token, color);
                let str = '';
                if (light)
                    str += !light.includes(':') ? modifier + '-' + light : light;
                if (dark)
                    str += !dark.includes(':') ? ' dark:' + (modifier + '-' + dark) : dark;
                result.push(`  ${color}: '${str}'`);
            }
        }
        return result;
    }
    const result = [];
    for (const [key, conf] of Object.entries(tokens)) {
        const { modifiers: modifierObj, rename, ...nConf } = getConfig(tokens, conf); // normalize obj
        if (!modifierObj)
            continue;
        for (const [sKey, state] of Object.entries(nConf)) {
            const modifiers = modifierObj[sKey]; // get modifier collection.
            if (!modifiers)
                continue; // nothing to do if no modifiers.
            for (const mod of modifiers) {
                // iterate modifiers, build each class.
                const str = buildClass(mod, state); // generate the Tailwind class prefixed with modifier.
                if (!str.length)
                    continue;
                let group = key.toLowerCase() + createLabel(mod); // create object name.
                if (rename && typeof rename[group] === 'string')
                    group = rename[group];
                result.push(`export const ${group} = {\n${str.join(',\n')}\n};`); // apply contents to object.
            }
        }
    }
    return result.join('\n\n');
}
