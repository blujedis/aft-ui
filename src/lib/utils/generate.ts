import type { ThemeColor, DeepPartial, ThemeShade } from '$lib/types';
import { getProperty } from 'dot-prop';

type TokenKey = keyof typeof defaultTokens;
type TokenPath = `${TokenKey}.${string}`;
type TokenColor = `--${string}` | `${ThemeColor}-${ThemeShade}` | number;
type TokenTuple = [TokenColor, TokenColor];
type TokenValue = TokenColor | TokenPath | TokenTuple;

type TokenModifier =
	| 'aria-current'
	| 'aria-expanded'
	| 'aria-selected'
	| 'aria-checked'
	| 'group-aria-checked'
	| 'aria-disabled'
	| 'focus'
	| 'focus-within'
	| 'focus-visible'
	| 'peer-focus'
	| 'group-focus'
	| 'group-focus-within';


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

const defaultTypeMap = {
	solid: ['bg', 'fill', 'ring', 'border', 'stroke'],
	soft: ['stripe'],
	transparent: ['bg', 'fill', 'ring', 'border', 'stroke'],
	dim: ['text'],
	divide: ['divide'],
};

const defaultTokens = {

	solid: {
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

	transparent: {
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

	dim: {
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

	divide: {
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

};

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

function ensureTokens(
	tokens: TokenMap<TokenConfigInit>,
	value: TokenValue,
	options = {} as { type?: string; color?: ThemeColor }

): null | string {

	if (!value) return null;

	// top level key or nested.value in token map.
	if (typeof value === 'string' && value.includes('.')) 
		return ensureTokens(tokens, getProperty(tokens, value));

	// value is css variable
	if (typeof value === 'string' && value.startsWith('--') && options.type)
		return `${options.type}-[color:var(${value})]`;

	// value is numeric color level.
	if (typeof value === 'number' && options.color) 
		return `${options.color}-${value}`;

	// Tuple for light/dark colors.
	if (Array.isArray(value)) {
		//
	}

	return null;

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
>(tokens: T, colors: C) {

	const map = {} as any;

	for (const [key, conf] of Object.entries(tokens)) {

		const nConf = ensureConfig(tokens, conf);

		for (const [color, token] of Object.entries(nConf)) {

			const nTokens = ensureTokens(tokens, token, { color: color as ThemeColor });

		}
		
	}

}

