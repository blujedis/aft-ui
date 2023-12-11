import type { ThemeColor, DeepPartial, ThemeShade } from '$lib/types';
import { getProperty } from 'dot-prop';

type TokenMap = typeof defaultTokens;
type TokenKey = keyof TokenMap;
type TokenValue = `--${string}` | `${TokenKey}.${string}` | `${ThemeColor}-${ThemeShade}`;
type TokenValueInitial = TokenValue | number;
type TokenTuple = [TokenValueInitial, TokenValueInitial?];
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

type TokenModifierConfig<K extends TokenKey = TokenKey> = Record<
	'modifiers',
	Record<keyof TokenMap[K], TokenModifier | TokenModifier[]>
>


type TokenConfigInitial =
	| TokenKey
	| (Record<ThemeColor | 'common', TokenValueInitial | TokenTuple> &
			Record<'modifiers', string | [string, string]>)
	| TokenModifierConfig
	| Record<'$base', string>;

type TokenConfig = Record<ThemeColor | '$base', string>;

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
	// [COMMON]

	ring: {
		common: 'bg-filled.common',
		default: 'bg-filled.default',
		dark: 'bg-filled.dark'
	},

	border: 'ring',

	// [FILLED]

	'bg-filled': {
		common: 500,
		default: ['frame-200', 'frame-600'],
		dark: ['frame-500', 'frame-800']
	},

	'bg-filled-selected': {
		common: 'bg-filled.common',
		default: 'bg-filled.default',
		dark: 'bg-filled.dark'
	},

	'text-filled': {
		common: 'text-white',
		default: ['--text-dark', '--text-light'],
		dark: '--text-light'
	},

	// [OUTLINED]

	'outlined-filled': {
		common: 'bg-filled.common',
		default: 'bg-filled.default',
		dark: 'bg-filled.dark'
	},

	// [GHOST]

	'bg-ghost': {
		common: '500/50',
		default: ['frame-200/50', 'frame-500/50'],
		dark: 'frame-700/50'
	},

	'bg-ghost-selected': {
		common: 'bg-ghost.common',
		default: 'bg-ghost.default',
		dark: 'bg-ghost.dark'
	}
};

function ensureTuple(value?: TokenValueInitial | TokenTuple): TokenTuple {
	if (typeof value === 'undefined' || value === null || Array.isArray(value))
		return (value || []) as TokenTuple;
	return [value];
}

function ensureObjects<T extends Record<string, any>>(tokens: T) {
	const keys = Object.keys(tokens);

	for (const [key, val] of Object.entries(tokens)) {
		let conf: Record<string, any> | undefined = undefined;

		if (typeof val === 'string' && keys.includes(key)) {
			const result = getProperty(tokens, val);
			if (result && !Array.isArray(result) && typeof result === 'object')
				conf = ensureObjects(result);
		} else if (typeof val === 'object' && !Array.isArray(val)) {
			//
		}
	}
}

function parseTokens<
	T extends DeepPartial<Record<TokenKey, TokenConfigInitial>>,
	C extends Record<string, string>
>(tokens: T, colors: C) {
	const normalized = { $base: '' } as TokenConfig;
	const colorKeys = Object.keys(colors);
	const tokenKeys = Object.keys(tokens);

	function parseValue(
		value: TokenValueInitial | TokenTuple,
		options = {} as { type?: string; color?: ThemeColor }
	): null | string {
		if (!value) return null;
		// top level key or nested.value in token map.
		if (typeof value === 'string' && value.includes('.')) return getProperty(tokens, value);
		// value is css variable
		if (typeof value === 'string' && value.startsWith('--') && options.type)
			return `${options.type}-[color:var(${value})]`;
		// value is numeric color level.
		if (typeof value === 'number' && options.color) return `${options.color}-${value}`;
		// Tuple for light/dark colors.
		if (Array.isArray(value)) {
			//
		}
		return null;
	}

	function normalize(
		conf: null | undefined | TokenKey | DeepPartial<TokenConfigInitial>
	): null | TokenConfig {
		if (!conf) return null;
		else if (typeof conf === 'string') {
			const found = getProperty(tokens, conf);
			return normalize(found);
		} else {
			const clone = JSON.parse(JSON.stringify({ ...conf })) as DeepPartial<TokenConfigInitial>;
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


