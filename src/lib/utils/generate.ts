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
type TokenMap<C extends TokenConfig | TokenConfigInit> = Record<TokenKey, C>;

const defaultColors = {
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

	disabled: {
		default: 'frame-300',
		dark: 'frame-700',
		primary: 300,
		secondary: 300,
		tertiary: 300,
		danger: 300,
		warning: 300,
		success: 300,
		info: 300,
	},

	divided: {
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

	fill: {
		default: ['--text-dark', '--text-light'],
		dark: ['--text-dark', '--text-light'],
		primary: 500,
		secondary: 500,
		tertiary: 500,
		danger: 500,
		warning: 500,
		success: 500,
		info: 500,
	},

	stripes: {
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

	stroke: {
		default: ['--text-dark', '--text-light'],
		dark: ['--text-dark', '--text-light'],
		primary: 500,
		secondary: 500,
		tertiary: 500,
		danger: 500,
		warning: 500,
		success: 500,
		info: 500,
	}

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

function parseTokens<
	T extends TokenConfigInit,
	C extends Record<ThemeColor, string>
>(tokens: T, colors: C) {


	function parseValue(
		value: TokenValue | TokenTuple,
		options = {} as { type?: string; color?: ThemeColor }

	): null | string {

		if (!value) return null;

		// top level key or nested.value in token map.
		if (typeof value === 'string' && value.includes('.')) 
			return getProperty(tokens, value);

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
	
	function normalize(
		conf: null | undefined | TokenKey | DeepPartial<TokenConfigInit>
	): null | TokenConfig {

		if (!conf) 
			return null;

		else if (typeof conf === 'string') {
			const found = getProperty(tokens, conf);
			return normalize(found);
		} 
		
		else {

			const clone = JSON.parse(JSON.stringify({ ...conf })) as DeepPartial<TokenConfigInit>;

			for (const [key, val] of Object.entries(clone)) {
				if (key === 'common') continue;

				if (typeof val === 'number') {
					//
				} else {
					//
				}
			}
	
			return clone as TokenConfig;

		}
	}


}

