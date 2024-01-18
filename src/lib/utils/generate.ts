import type { ThemeColor, DeepPartial, ThemeShade } from '$lib/types';
import { getProperty } from 'dot-prop';

type TokenKey = 'solid' | 'muted' | 'soft' | 'ghost';
type TokenConfigKey = keyof TokenVariant;
type TokenPath = `${TokenKey}.${TokenConfigKey}` | `${TokenKey}.${TokenConfigKey}.${ThemeColor | '$base'}`;
type TokenColorRGB<P extends 'rgb' | 'rgba' = 'rgba' | 'rgb'> = `${P}(${number},${number | string},${number | string})` | `${P}(${number | string},${number | string},${number | string},${number | string})`;
type TokenColorHSL<P extends 'hsl' | 'hsla' = 'hsl' | 'hsla'> = `${P}(${number},${number | string},${number | string})` | `${P}(${number | string},${number | string},${number | string},${number | string})`;
type TokenColorHex = `#${string}` | `#${string}/${number}`;
type TokenColorVar = `--${string}`; // Make a repeating pattern type to force strict --value-value-value?
type TokenColor = `--${string}` | TokenColorHex | TokenColorRGB | TokenColorHex | TokenColorVar | TokenColorHSL | `${ThemeColor}-${ThemeShade}/${number}` | `${ThemeColor}-${ThemeShade}` | number;
type TokenTuple = [TokenColor, TokenColor?];
type TokenValue = TokenColor | TokenPath | TokenTuple;

type TokenVariant = {
	modifiers: Partial<Record<Exclude<keyof TokenVariant, 'modifiers'>, string[]>>;
	text?: TokenPath | Record<ThemeColor, TokenValue>;
	fill?: TokenPath | Record<ThemeColor, TokenValue>;
	hover?: TokenPath | Record<ThemeColor, TokenValue>;
	focus?: TokenPath | Record<ThemeColor, TokenValue>;
	selected?: TokenPath | Record<ThemeColor, TokenValue>;
};

type TokenConfig = Record<ThemeColor, string>;
type TokenMap<C extends TokenConfig | TokenVariant> = Record<TokenKey, C | TokenKey>;

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

const defaultModifiers = [
	'bg',
	'fill',
	'stroke',
	'ring',
	'border',
	'outline',
	'even:bg',
	'odd:bg',
];

const focusModifiers = [
	'focus:outline',
	'focus-visible:outline',
	'focus-within:outline',
	'peer-focus:outline',
	'group-focus:outline',
	'group-focus-within:outline',
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

	textBright: {
		modifiers: ['text'],
		colors: {
			...placeholder,
			$base: 'text-white',
			default: ['frame-800', 'frame-300'],
			dark: 'frame-300',
		}
	},

	textStandard: {
		modifiers: ['text'],
		colors: {
			default: ['frame-200', 'frame-600'],
			dark: ['frame-600', 'frame-900'],
			primary: 500,
			secondary: 500,
			tertiary: 500,
			danger: 500,
			warning: 500,
			success: 500,
			info: 500
		}
	},

	textSoft: {
		modifiers: ['text'],
		colors: {
			$base: '',
			default: ['frame-800', 'frame-300'],
			dark: ['frame-800', 'frame-300'],
			primary: [500, 400],
			secondary: [500, 400],
			tertiary: [500, 400],
			danger: [500, 400],
			warning: [500, 400],
			success: [500, 400],
			info: [500, 400],
		}
	},


	solid: {
		modifiers: {
			text: ['text'],
			fill: [...defaultModifiers],
			hover: ['hover'],
			focus: [...focusModifiers],
			selected: [], // ['aria-selected', 'aria-expanded', 'aria-current'],
		},
		text: {
			...placeholder,
			$base: 'text-white',
			default: ['frame-800', 'frame-300'],
			dark: 'frame-300',
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
		hover: {
			...placeholder,
			$base: 'hover:brightness-110',
			default: 'hover:brightness-105',
		},
		focus: 'ghost.focus',
		selected: {
			...placeholder,
			$base: 'aria-selected:saturate-150 aria-expanded:saturate-150 aria-current:saturate-150'
		}
	},

	soft: {
		modifiers: {
			text: ['text'],
			fill: [...defaultModifiers],
			hover: ['hover'],
			focus: [...focusModifiers],
			selected: [],
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
			info: [500, 400],
		},
		fill: {
			$base: '',
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
		hover: 'solid.hover',
		focus: 'ghost.focus',
		selected: 'solid.selected'
	},

	ghost: {
		modifiers: {
			text: ['text'],
			fill: [...defaultModifiers],
			hover: ['hover:bg'],
			focus: [...focusModifiers],
			selected: [],
		},
		text: 'soft.text',
		fill: {
			$base: '',
			default: ['frame-200/80', 'frame-500/50'],
			dark: ['frame-600/30', 'frame-900/50'],
			primary: ['500/20', '500/40'],
			secondary: ['500/20', '500/40'],
			tertiary: ['500/20', '500/40'],
			danger: ['500/20', '500/40'],
			warning: ['500/20', '500/40'],
			success: ['500/20', '500/40'],
			info: ['500/20', '500/40'],
		},
		hover: 'ghost.fill',
		focus: 'ghost.fill',
		selected: 'solid.selected'
	},

	// muted: {
	// 	modifiers: ['placeholder:text'],
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
	// 	color: {
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
} as unknown as TokenMap<TokenVariant>;

function createLabel(modifier: string) {
	const mod = modifier.split(':');
	const type = mod.pop()?.split('-')[0];
	if (!type) throw new Error(`Failed to create token group label using modifier ${modifier}`);
	const suffix = mod.reduce((a, c) => {
		const split = c.split('-');
		return [...a, ...split];
	}, [] as string[])
		.map((v) => v.charAt(0).toUpperCase() + v.slice(1)).join('');
	return type + suffix;
}

function isArbitrary(value: string) {
	if (value.startsWith('--')) return true;
	return ['#', 'rgb', 'rgba', 'hsl', 'hsla'].some(v => value.includes(v));
}

/**
 * Ensures the token configuration is a valid object
 * Configurations may reference other configurations
 * to limit verbosity.
 *
 * @param tokens the initial token configuration map.
 * @param obj the string or object to be normalized.
 */
function getConfig(tokens: TokenMap<TokenVariant>, obj: string | Record<string, any>) {
	if (typeof obj === 'string') return getConfig(tokens, getProperty(tokens, obj));
	return obj;
}

export function parseTokens<
	T extends TokenMap<TokenVariant>,
	C extends Record<ThemeColor | 'white' | 'black', string>
>(tokens: T, colors = defaultColorMap as C) {

	function normalizeToken(value?: TokenValue, color?: ThemeColor | 'white' | 'black'): null | string {
		if (!value) return null;

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
		if ((typeof value === 'number' || (typeof value === 'string' && value.includes('/') && !value.includes('-'))) && color) return `${colors[color]}-${value}`;

		if (typeof value === 'string')
			return value;
		return null;
	}

	function getTuple(value: TokenValue, color: ThemeColor | 'white' | 'black'): [string | null, string | null] {
		if (Array.isArray(value)) {
			const light = normalizeToken(value[0], color);
			const dark = normalizeToken(value[1], color);
			return [light, dark];
		}
		const light = normalizeToken(value, color);
		return [light, null];
	}

	function buildClass(modifier: string, conf?: TokenPath | Record<ThemeColor, TokenValue>) {
		if (!conf) return [];
		const nConf = getConfig(tokens, conf) as Record<ThemeColor, TokenValue>;
		const result = [];
		for (const [color, token] of Object.entries(nConf)) {
			if (color === '$base') { // do not parse base styles, copy to result.
				result.push(`  ${'$base'}: '${token}'`);
			}
			else {
				const [light, dark] = getTuple(token, color as ThemeColor);
				let str = '';
				if (light) str += !light.includes(':') ? (modifier + '-' + light) : light;
				if (dark) str += !dark.includes(':') ? ' dark:' + (modifier + '-' + dark) : dark
				result.push(`  ${color}: '${str}'`);
			}
		}
		return result;
	}

	const result = [];

	for (const [key, conf] of Object.entries(tokens)) {
		const { modifiers: modifierObj, ...nConf } = getConfig(tokens, conf) as TokenVariant; // normalize obj
		for (const [sKey, state] of Object.entries(nConf)) {
			const modifiers = modifierObj[sKey as keyof typeof modifierObj]; // get modifier collection.
			if (!modifiers) continue; // nothing to do if no modifiers.
			for (const mod of modifiers) { // iterate modifiers, build each class.
				const str = buildClass(mod, state); // generate the Tailwind class prefixed with modifier.
				if (!str.length) continue;
				const group = createLabel(mod) + (key.charAt(0).toUpperCase() + key.slice(1)); // create object name.
				result.push(`export const ${group} = {\n${str.join(',\n')}\n};`); // apply contents to object.
			}
		}
	}
	return result.join('\n\n');
}

// const textStr = buildTokens('text', nConf.text);
// if (textStr.length) {
// 	const textGroup = 'text' + (key.charAt(0).toUpperCase() + key.slice(1));
// 	resultStr.push(`export const ${textGroup} = {\n${textStr.join(',\n')}\n};`);
// }

// for (const mod of modifiers[key as keyof typeof modifiers]) {
// 	const fillStr = buildTokens(mod, nConf.fill);
// 	if (fillStr.length) {
// 		const fillGroup = createLabel(mod) + (key.charAt(0).toUpperCase() + key.slice(1));
// 		resultStr.push(`export const ${fillGroup} = {\n${fillStr.join(',\n')}\n};`);
// 	}
// }


// const collectionObj = {} as Record<keyof C, string>;
// const collectionStr = [];
// for (const [color, token] of Object.entries(nConf)) {

// 	const [light, dark] = getTuple(token, color as ThemeColor);
// 	let str = '';
// 	if (light) str += mod + '-' + light;
// 	if (dark) str += ' dark:' + (mod + '-' + dark);

// 	collectionObj[color as ThemeColor] = str;
// 	collectionStr.push(`  ${color}: '${str}'`);

// }
// resultObj[group] = collectionObj;

