import type { ThemeColor, DeepPartial, ThemeShade } from '$lib/types';
import { getProperty } from 'dot-prop';

type TokenKey = keyof typeof defaultTokens;
type TokenPath = `${TokenKey}.${string}`;
type TokenColor = `--${string}` | `${ThemeColor}-${ThemeShade}` | number;
type TokenTuple = [TokenColor, TokenColor];
type TokenValue = TokenColor | TokenPath | TokenTuple;

// type TokenModifier =
// 	| 'aria-current'
// 	| 'aria-expanded'
// 	| 'aria-selected'
// 	| 'aria-checked'
// 	| 'group-aria-checked'
// 	| 'aria-disabled'
// 	| 'focus'
// 	| 'focus-within'
// 	| 'focus-visible'
// 	| 'peer-focus'
// 	| 'group-focus'
// 	| 'group-focus-within';


type TokenConfigInit = Record<ThemeColor, TokenValue>;
type TokenConfig = Record<ThemeColor, string>;
type TokenMap<C extends TokenConfig | TokenConfigInit> = Record<TokenKey, C | TokenKey>;

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
	'text', 'bg', 'fill', 'stroke',
	'ring', 'border', 'outline',
	'even:bg', 'odd:bg',
	'hover:ring', 'group-hover:ring', 'aria-selected:ring',
	'aria-current:ring', 'aria-expanded:ring', 'focus:ring',
	'focus-visible:ring', 'focus-within:ring', 'peer-focus:ring',
	'group-focus:ring', 'group-focus-within:ring',
	'placeholder:text', 'placeholder:bg'
];

const defaultTypeMap = {
	opaque: defaultModifiers,
	muted: [...defaultModifiers, 'divide'],
	dim: defaultModifiers,
	pale: defaultModifiers,
	ghost: defaultModifiers,
};

const defaultTokens = {

	opaque: {
		default: ['frame-200', 'frame-600'],
		dark: ['frame-500', 'frame-800'],
		primary: 500,
		secondary: 500,
		tertiary: 500,
		danger: 500,
		warning: 500,
		success: 500,
		info: 500,
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
		info: [100, 600],
	},

	pale: {
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
		info: '500/50',
	},

};

function createLabel(name: string, modifier: string) {
	const mod = modifier.split(':');
	const prefix = mod[0].split('-').map(v => v.charAt(0).toUpperCase() + v.slice(1));
	return name + prefix;
}

function ensureTuple(value?: TokenColor | TokenTuple): TokenTuple {
	if (typeof value === 'undefined' || value === null)
		return [] as unknown as TokenTuple;
	if (Array.isArray(value))
		if (value.length !== 2)
			throw new Error(`TokenTuple must be a length of 2`)
		else
			return value;
	return [value, value] as TokenTuple;
}

/**
 * Ensures the token configuration is a valid object
 * Configurations may reference other configurations
 * to limit verbosity. 
 * 
 * @param tokens the initial token configuration map.
 * @param obj the string or object to be normalized. 
 */
function ensureConfig(tokens: TokenMap<TokenConfigInit>, obj: string | TokenConfigInit) {
	if (typeof obj === 'string')
		return ensureConfig(tokens, getProperty(tokens, obj));
	return obj;
}

function parseTokens<
	T extends TokenMap<TokenConfigInit>,
	C extends Record<ThemeColor, string>
>(tokens: T, colors = defaultColorMap as C) {

	function ensureTokens(
		value: TokenValue,
		color: ThemeColor
	
	): null | string {
	
		if (!value) return null;
	
		// if value contains dot notation get property value
		// by using getter, then recurse.
		if (typeof value === 'string' && value.includes('.'))
			return ensureTokens(getProperty(tokens, value), color);
	
		// value is css variable
		// first segment of css var must match tailwind
		// type such as --text-, --bg-, --border-
		// full example --text-primary, --border-danger
		if (typeof value === 'string' && value.startsWith('--')) {
			const type = value.replace(/^--/, '').split('-')[0];
			return `${type}-[color:var(${value})]`;
		}
	
	
		// value is numeric color level, combine with color.
		if (typeof value === 'number' && color)
			return `${colors[color]}-${value}`;
	
		// tuple for light/dark colors.
		if (Array.isArray(value)) {
			return [
				ensureTokens(value[0], color), 
				ensureTokens(value[0], color)
			].join(' ');
		}
	
		return null;
	
	}

	const result = {} as Record<string, Record<keyof C, string>>;

	for (const [key, conf] of Object.entries(tokens)) {

		const nConf = ensureConfig(tokens, conf);

		for (const mod of defaultModifiers) {

			const name = createLabel('', '');
			const collection = {} as Record<keyof C, string>;

			for (const [color, token] of Object.entries(nConf)) {

				const nToken = ensureTokens(token, color as ThemeColor);
	
			}

		}

	}

	return result;

}

