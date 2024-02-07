
import type { ThemeColor, ThemeShade } from '../types';
import { colors } from '../constants/colors';
import { getProperty } from 'dot-prop';
import { mergeConfigs } from './utils';

type TypeOrValue<Keys extends string | number | symbol> = Keys | (string & { value?: any });

// type PaletteColor = ThemeColor; // Exclude<ThemeColor, 'default' | 'dark'> | 'frame';
type TokenOpacity = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100;
type TokenWidth = 0 | 1 | 2 | 4 | 8;
type ThemeColorBase = ThemeColor | `${ThemeColor}-${ThemeShade}`;
type TokenColor = ThemeColorBase | `${ThemeShade}/${TokenOpacity}`;
type TokenTuple = [TypeOrValue<TokenColor | ThemeShade>, TypeOrValue<TokenColor | ThemeShade>?];
type TokenValue = TypeOrValue<TokenColor | ThemeShade> | TokenTuple;

type TokenVariantModifier = string[];

type TokenConfHandler = (tokens: TokenMap) => string | TokenConfInit;

type TokenConfInit =
	| string
	| (Partial<Record<ThemeColor, TokenValue>> & {
		$base?: string | Partial<Record<ThemeColor | '$base', TokenValue>>;
	});

type TokenConf = Record<ThemeColor, TokenValue> & {
	$base?: string | Partial<Record<ThemeColor | '$base', TokenValue>>;
};

type TokenVariant = {
	variant?: string; // if undefined use key name.
	modifiers: string | TokenVariantModifier;
	colors?: TokenConfInit | TokenConfHandler;
};

type TokenMap = Record<string, TokenVariant>;

interface GenerateOptions {

	bodyTextLight: ThemeColorBase | 'white' | 'black';
	bodyTextDark: ThemeColorBase | 'white' | 'black';

	bodyBgLight: ThemeColorBase | 'white' | 'black';
	bodyBgDark: ThemeColorBase | 'white' | 'black';

	shade: ThemeShade;

	softOpacity: TokenOpacity;
	hoverOpacity: TokenOpacity;
	focusOpacity: TokenOpacity;
	softSelectedOpacity: TokenOpacity;
	disabledOpacity: TokenOpacity;

	gridOpacity: TokenOpacity;
	gridColor: ThemeColorBase | 'black';

	focusOffset: TokenWidth;
	focusWidth: TokenWidth;
}

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
	frame: '',
	// default: '',
	// dark: '',
	primary: '',
	secondary: '',
	tertiary: '',
	danger: '',
	warning: '',
	success: '',
	info: '',
};

export const defaultOptions = {
	bodyTextLight: 'frame-700',
	bodyTextDark: 'frame-100',
	bodyBgLight: 'white',
	bodyBgDark: 'frame-800',

	shade: 500,

	softOpacity: 10,
	hoverOpacity: 20,
	focusOpacity: 50,
	softSelectedOpacity: 70,
	disabledOpacity: 60,

	gridColor: 'frame-900',
	gridOpacity: 40,

	focusOffset: 0,
	focusWidth: 2
} as GenerateOptions;

//export let defaultTokens = getDefaultTokens();

function getDefaultTokens(options: Required<GenerateOptions>) {

	const {
		bodyTextDark, shade, softOpacity, hoverOpacity,
		softSelectedOpacity, focusOpacity
	} = options;

	return {

		bg: {
			variant: 'main',
			modifiers: ['bg', 'stroke', 'fill', 'even:bg', 'odd:bg', 'ring', 'border', 'outline'],
			colors: () => createColorMap(colors, shade, true)
		},

		text: {
			variant: 'main',
			modifiers: ['text'],
			colors: () => createColorMap(colors, shade, shade, { frame: '' })
		},

		textWhite: {
			variant: 'white',
			modifiers: ['text'],
			colors: {
				$base: `text-${bodyTextDark} dark:text-${bodyTextDark}`
			}
		},


		textSoft: {
			variant: 'soft',
			modifiers: ['text'],
			colors: 'text.colors'
		},

		bgSoft: {
			variant: 'soft',
			modifiers: ['bg'],
			colors: createColorMap(colors, `${shade}/${softOpacity}`, true)
		},

		bgPanel: {
			variant: 'panel',
			modifiers: ['bg'],
			colors: {
				$base: `bg-frame-${shade}/${softOpacity} dark:bg-frame-${shade}/${softOpacity}`
			}
		},

		bgHoverGhost: {
			variant: 'ghost',
			modifiers: ['hover:bg'],
			colors: createColorMap(colors, `${shade}/${hoverOpacity}`, true)
		},

		bgHoverSoft: {
			variant: 'soft',
			modifiers: ['hover:bg'],
			colors: createColorMap(colors, `${shade}/${softOpacity}`, true)
		},

		bgHoverPanel: {
			variant: 'panel',
			modifiers: ['hover:bg'],
			colors: {
				$base: `hover:bg-frame-${shade}/${softOpacity - 5} dark:hover:bg-frame-${shade}/${softOpacity - 5}`
			}
		},

		bgSelected: {
			variant: 'selected',
			modifiers: [
				'aria-selected:bg',
				'aria-expanded:bg',
				'aria-current:bg',
				'aria-checked:bg'
			],
			colors: 'bg.colors'
		},

		bgSelectedAccent: {
			variant: 'selectedAccent',
			modifiers: [...selectedBgModifiers],
			colors: createColorMap(colors, shade + 100, true)
		},

		bgSelectedGhost: {
			variant: 'selectedGhost',
			modifiers: [...selectedBgModifiers],
			colors: 'bgHoverGhost.colors'
		},

		bgSelectedSoft: {
			variant: 'selectedSoft',
			modifiers: [...selectedBgModifiers],
			colors: createColorMap(colors, `${shade}/${softSelectedOpacity}`, true)
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
			colors: createColorMap(colors, `${shade}/${focusOpacity}`, true)
		},

		ringFocus: {
			variant: '',
			modifiers: [...focusRingModifiers],
			colors: 'outlineFocus.colors'
		}

	} as TokenMap;

}

function getCommon(options: Required<GenerateOptions>) {

	options = {
		...defaultOptions,
		...options
	};

	const {
		gridColor, gridOpacity,
		disabledOpacity, focusOffset, focusWidth
	} = options as Required<GenerateOptions>;

	const gridOpacityLight = getMin(gridOpacity, 30, 10);

	const common = {
		transitioned: 'transition motion-reduce:transition-none',
		ringed: `ring-${gridColor}/${gridOpacityLight} dark:ring-${gridColor}/${gridOpacity}`,
		bordered: `border-${gridColor}/${gridOpacityLight} dark:border-${gridColor}/${gridOpacity}`,
		divided: `divide-${gridColor}/${gridOpacityLight} dark:divide-${gridColor}/${gridOpacity}`,
		disabled:
			`disabled:opacity-${disabledOpacity - 10} aria-disabled:opacity-${disabledOpacity - 10} dark:disabled:opacity-${disabledOpacity} dark:aria-disabled:opacity-${disabledOpacity} pointer-events-none`,

		focused: `outline-none focus:outline-${focusWidth} focus:outline-offset-${focusOffset}`,
		focusedVisible: `outline-none focus-visible:outline-${focusWidth} focus-visible:outline-offset-${focusOffset}`,
		focusedWithin: `outline-none focus-within:outline-${focusWidth} focus-within:outline-offset-${focusOffset}`,

		muteSelected: `aria-selected:opacity-${disabledOpacity}`,


	};

	return objectToString('common', common);

}

// ex: getMin(40, 50, 10) = 10
// subtracting 50 from 40 = -10 but our min val was set to 10
// Math.max will choose the larger  number between -10 and 10.
function getMin(value: number, offset = 0, min = 0) {
	return Math.max(min, value - offset);
}

// ex: getMax(40, 50, 60) = 60
// adding 40 to 50 = 90 but our max val was set to 60
// Math.min will choose the lower or our max between 60 and 90.
function getMax(value: number, offset = 0, max = 0) {
	return Math.min(max, value + offset);
}

function createColorMap(colors: readonly ThemeColor[], light: string | number, dark?: string | number | boolean, override?: Partial<Record<ThemeColor | '$base', any>>) {
	const result = colors.reduce((a, c) => {
		if (dark === true)
			dark = light;
		if (!dark && light)
			a[c as ThemeColor] = light;
		else if (light && dark)
			a[c as ThemeColor] = [light, dark];
		return a;
	}, {} as Record<ThemeColor, string | number | [string | number, string | number]> & { $base: string });
	if (typeof override !== 'undefined')
		return { ...result, ...override };
	return result;
}

function toCamelCase(arr: string[]) {
	arr = arr.filter(v => {
		return v.length > 0;
	});
	return arr.reduce((result, curr, i) => {
		if (i === 0) {
			result.push(curr.toLowerCase());
		}
		else {
			result.push(curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase());
		}
		return result;
	}, [] as string[]).join('');
}

function ensureArray<T = any>(value: T | T[]): T[] {
	if (Array.isArray(value) || typeof value === 'undefined' || value === null)
		return value || [];
	return [value];
}

function objectToString(name: string, obj: Record<string, any>, level = 1, indent = 2): string {
	const template = level > 1 ? `{\n{0}\n${' '.repeat(indent)}}` : `export const ${name} ={\n{0}\n};`;
	const rows = [];
	for (const [key, val] of Object.entries(obj)) {
		if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
			const nestedVal = objectToString(key, val, level += 1);
			rows.push(`${' '.repeat(indent)}${key}: ${nestedVal}`);
		}
		else {
			rows.push(`${' '.repeat(indent * level)}${key}: '${val}'`);
		}
	}
	return template.replace('{0}', rows.join(',\n'));
}

function getConfig(
	tokens: Record<string, TokenVariant>,
	obj?: string | Record<string, unknown> | TokenConfHandler
) {
	// defaultTokens = defaultTokens || getDefaultTokens();
	if (typeof obj === 'function') {
		obj = obj(tokens);
	}
	if (typeof obj === 'string') return getConfig(tokens, getProperty(tokens, obj));
	return obj;
}

function createLabel(modifier: string) {
	const mod = modifier.split(':');
	const type = mod.pop()?.split('-')[0];
	if (!type) throw new Error(`Failed to create token group label using modifier ${modifier}`);
	const suffix = mod
		.reduce((a, c) => {
			const split = c.split('-');
			return [...a, ...split];
		}, [] as string[])
		.map((v) => v.charAt(0).toUpperCase() + v.slice(1))
		.join('');
	return type.charAt(0).toUpperCase() + type.slice(1) + suffix;
}

function normalizeToken(
	tokens?: Record<string, any>,
	value?: TokenValue,
	color?: ThemeColor | 'white' | 'black' | 'frame'
): null | string {

	if (!value) return null;

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

function getTuple(
	tokens: Record<string, any>,
	value: TokenValue,
	color: ThemeColor | 'white' | 'black' | 'frame'
): [string | null, string | null] {

	if (Array.isArray(value)) {
		const light = normalizeToken(tokens, value[0], color);
		const dark = normalizeToken(tokens, value[1], color);
		return [light, dark];
	}

	const light = normalizeToken(tokens, value, color);
	return [light, null];
}

function buildClassItem(tokens: Record<string, any>, modifier: string, color: string, token: TokenValue) {
	if (typeof token === 'string') {
		token = token.trim();
		// manually defined row containing 
		if (/\s/.test(token))
			return token;
	}
	const suffix = modifier.split(':').pop();
	let [light, dark] = getTuple(tokens, token as TokenValue, color as ThemeColor);
	let str = '';
	light = light || '';
	dark = dark || '';
	light = light.replace(`${suffix}-`, '');
	dark = dark.replace(`${suffix}-`, '');
	if (light) str += !light.includes(':') ? modifier + '-' + light : ' ' + light;
	if (dark) str += !dark.includes(':') ? ' dark:' + (modifier + '-' + dark) : ' ' + dark;
	return str;
}

function buildClass(tokens: Record<string, any>, modifier: string, conf?: TokenConfInit | TokenConfHandler) {

	if (!conf) return [];

	const _conf = { ...placeholder, ...getConfig(tokens, conf) };
	const { $base, ...nConf } = _conf as TokenConf;
	const result = {} as Record<string, any>;

	const extend = (typeof $base === 'string' || Array.isArray($base) ? { $base } : $base || { $base: '' }) as Partial<
		Record<ThemeColor | '$base', any>
	>;

	for (const [color, token] of Object.entries(extend)) {
		const str = buildClassItem(tokens, modifier, color, token);
		extend[color as keyof typeof extend] = str;
	}

	for (const [color, token] of Object.entries(nConf)) {
		const str = buildClassItem(tokens, modifier, color, token);
		result[color] = str;
	}

	return mergeConfigs(extend, result) as Record<ThemeColor | '$base', string>;
}

export function parseTokens<
	T extends TokenMap
>(options?: Partial<GenerateOptions>) {

	options = {
		...defaultOptions,
		...options
	};

	const tokens = getDefaultTokens(options as Required<GenerateOptions>);

	const result = [] as string[];
	const keys = [] as string[];

	result.push(getCommon(options as Required<GenerateOptions>));

	for (const [gKey, gConf] of Object.entries(tokens)) {

		const {
			modifiers,
			variant,
			colors
		} = getConfig(tokens, gConf) as TokenVariant;

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


// function extend(path: string | Record<string, unknown>, ...obj: Record<string, unknown>[]): any {
// 	defaultTokens = defaultTokens || getDefaultTokens();
// 	const existing =
// 		typeof path === 'string'
// 			? getConfig(defaultTokens, getProperty(defaultTokens, path)) || {}
// 			: {};
// 	const next = obj.shift() || {} as TokenVariant;
// 	if (obj.length) return extend({ ...existing, ...next }, ...obj);
// 	return { ...existing, ...next };
// }

// function createResult(name: string, content: string[]) {
// 	return `export const ${name} = {\n${content.join(',\n')}\n};`;
// }

// function toColor(type: string, color: ThemeColor | 'white' | 'black', value?: number | 'white' | 'black', opacity?: number) {
// 	if (['white', 'black'].includes(value + ''))
// 		color = (value + '');
// 	if (['white', 'black'].includes(color))
// 		return opacity ? `${type}-${color}/${opacity}` : `${type}-${color}`;
// 	return opacity ? `${type}-${color}-${value}/${opacity}` : `${type}-${color}-${value}`;
// }