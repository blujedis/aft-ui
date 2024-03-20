import { colors as baseColors } from '../constants/colors';
import { getProperty } from 'dot-prop';
import { mergeConfigs } from './utils';
const colors = ['white', 'black', ...baseColors];
const focusOutlineModifiers = [
    'focus:outline',
    'focus-visible:outline',
    'focus-within:outline',
    'peer-focus:outline',
    'group-focus:outline',
    'group-focus-within:outline'
];
const focusRingModifiers = [
    'focus:ring',
    'focus-visible:ring',
    'focus-within:ring',
    'peer-focus:ring',
    'group-focus:ring',
    'group-focus-within:ring'
];
const selectedBgModifiers = [
    'aria-selected:bg',
    'aria-expanded:bg',
    'aria-current:bg',
    'aria-checked:bg'
];
const selectedTextModifiers = [
    'aria-selected:text',
    'aria-expanded:text',
    'aria-current:text',
    'aria-checked:text'
];
const placeholder = {
    $base: '',
    unstyled: '',
    white: '',
    black: '',
    frame: '',
    primary: '',
    secondary: '',
    tertiary: '',
    danger: '',
    warning: '',
    success: '',
    info: ''
};
export const defaultOptions = {
    bodyTextLight: 'frame-700',
    bodyTextDark: 'frame-100',
    bodyBgLight: 'white',
    bodyBgDark: 'frame-800',
    defaultShade: 500,
    softOpacity: 20,
    hoverOpacity: 20,
    focusOpacity: 50,
    softSelectedOpacity: 40,
    disabledOpacity: 60,
    focusOffset: 0,
    focusWidth: 2,
    formBorderColorLight: 'frame-200',
    formBorderColorDark: 'frame-700',
    panelBgLight: 'frame-100',
    panelBgDark: 'frame-700',
    panelContainerBgLight: 'frame-200',
    panelContainerBgDark: 'frame-900'
};
function getDefaultTokens(options, themeColors = colors) {
    const { bodyTextDark, bodyTextLight, defaultShade, softOpacity, hoverOpacity, softSelectedOpacity, focusOpacity, panelBgDark, panelBgLight, panelContainerBgDark, panelContainerBgLight } = options;
    return {
        icon: {
            variant: 'icon',
            modifiers: ['text', 'fill', 'stroke'],
            colors: () => createColorMap(themeColors, defaultShade, defaultShade)
        },
        bg: {
            variant: 'main',
            modifiers: ['bg', 'even:bg', 'odd:bg'],
            colors: () => createColorMap(themeColors, defaultShade, true, {
                frame: ['200/85', 700]
            })
        },
        ring: {
            variant: 'main',
            modifiers: [
                'ring',
                'border',
                'outline',
                'group-hover:border',
                'peer-focus:border',
                'peer-hover:border'
            ],
            colors: () => createColorMap(themeColors, defaultShade, true, {
                frame: [300, 700]
            })
        },
        bgSoft: {
            variant: 'soft',
            modifiers: ['bg'],
            colors: createColorMap(themeColors, `${defaultShade}/${softOpacity}`, true, {
                frame: 'bg-frame-100 dark:bg-frame-500/20'
            })
        },
        bgPanel: {
            variant: 'panel',
            modifiers: ['bg'],
            colors: {
                $base: `bg-${panelBgLight} dark:bg-${panelBgDark}`
            }
        },
        bgPanelContainer: {
            variant: 'panelContainer',
            modifiers: ['bg'],
            colors: {
                $base: `bg-${panelContainerBgLight} dark:bg-${panelContainerBgDark}`
            }
        },
        bgNotification: {
            variant: 'notification',
            modifiers: ['bg'],
            colors: {
                $base: `bg-${panelBgDark} dark:bg-${panelBgLight}`
            }
        },
        bgTooltip: {
            variant: 'tooltip',
            modifiers: ['bg'],
            colors: () => createColorMap(themeColors, defaultShade, true, {
                frame: `bg-${panelBgDark} dark:bg-${panelBgLight}`
            })
        },
        bgPanelAccordion: {
            variant: 'panelAccordion',
            modifiers: ['bg'],
            colors: {
                $base: `bg-frame-${defaultShade}/${softOpacity} dark:bg-frame-${defaultShade}/${softOpacity}`
            }
        },
        bgHoverGhost: {
            variant: 'ghost',
            modifiers: ['hover:bg'],
            colors: createColorMap(themeColors, `${defaultShade}/${hoverOpacity}`, true)
        },
        bgHoverSoft: {
            variant: 'soft',
            modifiers: ['hover:bg'],
            colors: createColorMap(themeColors, `${defaultShade}/${softOpacity}`, true)
        },
        bgHoverPanel: {
            variant: 'panel',
            modifiers: ['hover:bg'],
            colors: {
                $base: 'hover:bg-frame-200/70 hover:dark:bg-frame-900/80'
            }
        },
        bgHoverPanelAccordion: {
            variant: 'panelAccordion',
            modifiers: ['hover:bg'],
            colors: {
                $base: `hover:bg-frame-${defaultShade}/${softOpacity - 5} dark:hover:bg-frame-${defaultShade}/${softOpacity - 5}`
            }
        },
        bgSelected: {
            variant: 'selected',
            modifiers: [
                'aria-selected:bg',
                'aria-expanded:bg',
                'aria-current:bg',
                'aria-checked:bg',
                'aria-selected:border'
            ],
            colors: 'bg.colors'
        },
        bgSelectedAccent: {
            variant: 'selectedAccent',
            modifiers: [...selectedBgModifiers],
            colors: createColorMap(themeColors, defaultShade + 100, true)
        },
        bgSelectedGhost: {
            variant: 'selectedGhost',
            modifiers: [...selectedBgModifiers],
            colors: 'bgHoverGhost.colors'
        },
        bgSelectedSoft: {
            variant: 'selectedSoft',
            modifiers: [...selectedBgModifiers],
            colors: createColorMap(themeColors, `${defaultShade}/${softSelectedOpacity}`, true)
        },
        bgProgress: {
            variant: 'progress',
            modifiers: ['[&::-webkit-progress-value]:bg', '[&::-moz-progress-bar]:bg'],
            colors: () => createColorMap(themeColors, defaultShade, false, {
                $base: `bg-frame-${defaultShade}/${softOpacity} [&::-webkit-progress-bar]:bg-frame-${defaultShade}/${softOpacity}`
            })
        },
        bgRange: {
            variant: 'range',
            modifiers: ['bg'],
            colors: {
                $base: `bg-frame-${defaultShade}/${softOpacity} dark:bg-frame-${defaultShade}/${softOpacity}`
            }
        },
        bgSwitch: {
            variant: 'switch',
            modifiers: ['aria-checked:bg'],
            colors: () => createColorMap(themeColors, `${defaultShade}/80`, true, {
                $base: `bg-frame-${defaultShade}/${hoverOpacity} dark:bg-frame-${defaultShade}/${hoverOpacity}`
            })
        },
        textProgress: {
            variant: 'progress',
            modifiers: ['fill'],
            colors: () => createColorMap(themeColors, defaultShade, true, {
                frame: [`${bodyTextLight}`, `${bodyTextDark}`]
            })
        },
        strokeProgress: {
            variant: 'progress',
            modifiers: ['stroke'],
            colors: {
                $base: `stroke-frame-${defaultShade}/${softOpacity} dark:stroke-frame-${defaultShade}/${softOpacity}`
            }
        },
        text: {
            variant: 'main',
            modifiers: ['text'],
            colors: () => createColorMap(themeColors, defaultShade, true, { frame: '' })
        },
        textWhite: {
            variant: 'white',
            modifiers: ['text'],
            colors: {
                $base: `text-white dark:text-white`
            }
        },
        textTooltip: {
            variant: 'tooltip',
            modifiers: ['text'],
            colors: {
                ...placeholder,
                $base: `text-${bodyTextDark} dark:text-${bodyTextDark}`,
                frame: ['', `${bodyTextLight}`]
            }
        },
        textSoft: {
            variant: 'soft',
            modifiers: ['text'],
            colors: 'text.colors'
        },
        textFilled: {
            variant: 'filled',
            modifiers: ['placeholder'],
            colors: () => createColorMap(themeColors, getMin(defaultShade, -300, 200), true, {
                frame: 'placholder-frame-300'
            })
        },
        textNotification: {
            variant: 'notification',
            modifiers: ['text'],
            colors: {
                $base: `text-${bodyTextDark} dark:text-${bodyTextLight}`
            }
        },
        textDefault: {
            variant: 'default',
            modifiers: ['text'],
            colors: () => createColorMap(themeColors, defaultShade, true)
        },
        textInput: {
            variant: 'input',
            modifiers: ['text'],
            colors: () => createColorMap(themeColors, defaultShade, getMin(defaultShade, -100, 400), {
                frame: `text-${bodyTextLight} dark:text-${bodyTextDark}`
            })
        },
        textSelected: {
            variant: 'selected',
            modifiers: [...selectedTextModifiers],
            colors: 'text.colors'
        },
        textSelectedWhite: {
            variant: 'selectedWhite',
            modifiers: [...selectedTextModifiers],
            colors: {
                $base: [`${bodyTextDark}`, `${bodyTextDark}`]
            }
        },
        textSelectedGhost: {
            variant: 'selectedGhost',
            modifiers: [...selectedTextModifiers],
            colors: 'text.colors'
        },
        outlineFocus: {
            variant: '',
            modifiers: [...focusOutlineModifiers],
            colors: createColorMap(themeColors, `${defaultShade}/${focusOpacity}`, true)
        },
        ringFocus: {
            variant: '',
            modifiers: [...focusRingModifiers],
            colors: 'outlineFocus.colors'
        }
    };
}
function getCommon(options) {
    options = {
        ...defaultOptions,
        ...options
    };
    options.formBorderColorDark = options.formBorderColorDark || options.formBorderColorLight;
    const { formBorderColorLight, formBorderColorDark, disabledOpacity, focusOffset, focusWidth, defaultShade, softOpacity, bodyTextDark, bodyTextLight } = options;
    const common = {
        transitioned: 'transition motion-reduce:transition-none',
        ringed: `ring-${formBorderColorLight} dark:ring-${formBorderColorDark}`,
        bordered: `border-${formBorderColorLight} dark:border-${formBorderColorDark}`,
        divided: `divide-${formBorderColorLight} dark:divide-${formBorderColorDark}`,
        disabled: `disabled:opacity-${disabledOpacity - 10} aria-disabled:opacity-${disabledOpacity - 10} dark:disabled:opacity-${disabledOpacity} dark:aria-disabled:opacity-${disabledOpacity} pointer-events-none`,
        focusedOutline: `outline-none focus:outline-${focusWidth} focus:outline-offset-${focusOffset}`,
        focusedOutlineVisible: `outline-none focus-visible:outline-${focusWidth} focus-visible:outline-offset-${focusOffset}`,
        focusedOutlineWithin: `outline-none focus-within:outline-${focusWidth} focus-within:outline-offset-${focusOffset}`,
        focusedOutlineWithinVisible: `outline-none focus-within:[&:has(:focus-visible)]:outline-${focusWidth} focus-within:[&:has(:focus-visible)]:outline-offset-${focusOffset}`,
        focusedRing: `outline-none focus:outline-${focusWidth} focus:ring-offset-${focusOffset}`,
        focusedRingVisible: `outline-none focus-visible:ring-${focusWidth} focus-visible:ring-offset-${focusOffset}`,
        focusedRingWithin: `outline-none focus-within:ring-${focusWidth} focus-within:ring-offset-${focusOffset}`,
        muteSelected: `aria-selected:opacity-${disabledOpacity}`,
        mutedText: `text-${bodyTextLight}/60 dark:text-${bodyTextDark}/40`,
        formBorder: `border-${formBorderColorLight} dark:border-${formBorderColorDark}`,
        neutralBg: `bg-frame-${defaultShade}/${softOpacity} dark:bg-frame-${defaultShade}/${softOpacity}`,
        rangeBg: `frame-${defaultShade}/${softOpacity}`,
        rangeValue: `${defaultShade}`,
        rangeThumb: `${getMin(defaultShade, -200, 300)}`,
        placeholderFilled: `placeholder-frame-400`
    };
    return objectToString('common', common);
}
// ex: getMin(40, 50, 10) = 10
// subtracting 50 from 40 = -10 but our min val was set to 10
// Math.max will choose the larger  number between -10 and 10.
function getMin(value, offset = 0, min = 0) {
    return Math.max(min, value + offset);
}
// ex: getMax(40, 50, 60) = 60
// adding 40 to 50 = 90 but our max val was set to 60
// Math.min will choose the lower or our max between 60 and 90.
function getMax(value, offset = 0, max = 0) {
    return Math.min(max, value + offset);
}
function createColorMap(colors, light, dark, override) {
    const result = colors.reduce((a, c) => {
        if (['white', 'black'].includes(c)) {
            a[c] = [c, c];
            return a;
        }
        if (dark === true)
            dark = light;
        if (!dark && light)
            a[c] = light;
        else if (light && dark)
            a[c] = [light, dark];
        return a;
    }, {});
    if (typeof override !== 'undefined')
        return { ...result, ...override };
    return result;
}
function toCamelCase(arr) {
    arr = arr.filter((v) => {
        return v.length > 0;
    });
    return arr
        .reduce((result, curr, i) => {
        if (i === 0) {
            result.push(curr.toLowerCase());
        }
        else {
            result.push(curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase());
        }
        return result;
    }, [])
        .join('');
}
function ensureArray(value) {
    if (Array.isArray(value) || typeof value === 'undefined' || value === null)
        return value || [];
    return [value];
}
function objectToString(name, obj, level = 1, indent = 2) {
    const template = level > 1 ? `{\n{0}\n${' '.repeat(indent)}}` : `export const ${name} ={\n{0}\n};`;
    const rows = [];
    for (const [key, val] of Object.entries(obj)) {
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            const nestedVal = objectToString(key, val, (level += 1));
            rows.push(`${' '.repeat(indent)}${key}: ${nestedVal}`);
        }
        else {
            rows.push(`${' '.repeat(indent * level)}${key}: '${val}'`);
        }
    }
    return template.replace('{0}', rows.join(',\n'));
}
function getConfig(tokens, obj) {
    // defaultTokens = defaultTokens || getDefaultTokens();
    if (typeof obj === 'function') {
        obj = obj(tokens);
    }
    if (typeof obj === 'string')
        return getConfig(tokens, getProperty(tokens, obj));
    return obj;
}
function createLabel(modifier) {
    const mod = modifier.split(':');
    const type = mod.pop()?.split('-')[0];
    if (!type)
        throw new Error(`Failed to create token group label using modifier ${modifier}`);
    let suffix = mod
        .reduce((a, c) => {
        const split = c.split('-');
        return [...a, ...split];
    }, [])
        .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
        .join('');
    suffix = suffix.replace(/^\[&/, '').replace(/\]$/, '');
    return type.charAt(0).toUpperCase() + type.slice(1) + suffix;
}
function normalizeToken(tokens, value, color) {
    if (!value)
        return null;
    // Value is numeric color level.
    if (color && typeof value === 'number')
        return `${color}-${value}`;
    if (typeof value === 'string') {
        // if value contains dot notation get property value
        // by using getter, then recurse.
        if (typeof value === 'string' && value.includes('.'))
            return normalizeToken(getProperty(tokens, value), color);
        // color level with opacity modifie ex 500/50
        if (color && value.includes('/') && !value.includes('-'))
            return `${color}-${value}`;
        return value;
    }
    return null;
}
function getTuple(tokens, value, color) {
    if (Array.isArray(value)) {
        const light = normalizeToken(tokens, value[0], color);
        const dark = normalizeToken(tokens, value[1], color);
        return [light, dark];
    }
    const light = normalizeToken(tokens, value, color);
    return [light, null];
}
function buildClassItem(tokens, modifier, color, token) {
    if (typeof token === 'string') {
        token = token.trim();
        // manually defined row containing
        if (/\s/.test(token))
            return token;
    }
    const suffix = modifier.split(':').pop();
    let [light, dark] = getTuple(tokens, token, color);
    let str = '';
    light = light || '';
    dark = dark || '';
    light = light.replace(`${suffix}-`, '');
    dark = dark.replace(`${suffix}-`, '');
    if (light)
        str += !light.includes(':') ? modifier + '-' + light : ' ' + light;
    if (dark)
        str += !dark.includes(':') ? ' dark:' + (modifier + '-' + dark) : ' ' + dark;
    return str;
}
function buildClass(tokens, modifier, conf) {
    if (!conf)
        return [];
    const _conf = { ...placeholder, ...getConfig(tokens, conf) };
    const { $base, ...nConf } = _conf;
    const result = {};
    const extend = (typeof $base === 'string' || Array.isArray($base) ? { $base } : $base || { $base: '' });
    for (const [color, token] of Object.entries(extend)) {
        const str = buildClassItem(tokens, modifier, color, token);
        extend[color] = str;
    }
    for (const [color, token] of Object.entries(nConf)) {
        const str = buildClassItem(tokens, modifier, color, token);
        result[color] = str;
    }
    return mergeConfigs(extend, result);
}
export function generateTokens(options) {
    options = {
        ...defaultOptions,
        ...options
    };
    const tokens = getDefaultTokens(options);
    const result = [];
    const keys = [];
    result.push(getCommon(options));
    for (const [gKey, gConf] of Object.entries(tokens)) {
        const { modifiers, variant, colors } = getConfig(tokens, gConf);
        const modifiersArr = ensureArray(modifiers);
        for (const m of modifiersArr) {
            const prefix = (variant || '').split(/(?=[A-Z])/);
            let suffix = createLabel(m);
            if (!(variant || '').length)
                suffix = suffix.charAt(0).toLocaleLowerCase() + suffix.slice(1);
            const name = toCamelCase([...prefix, ...suffix.split(/(?=[A-Z])/)]);
            if (keys.includes(name))
                throw new Error(`Detected duplicate generated key/alias name ${name}.`);
            const obj = buildClass(tokens, m, colors);
            result.push(objectToString(name, obj));
            keys.push(name);
        }
    }
    return result.join('\n\n');
}
// bg-[rgb(var(--color-primary-600))]/[0.50]
// bg-[rgb(var(--color-primary-600))]/30
// hex example.
// text-[color:var(--text-light-hover)]
