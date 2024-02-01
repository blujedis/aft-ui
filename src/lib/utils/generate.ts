
import type { ThemeColor, ThemeShade } from '../types';
import { getProperty } from 'dot-prop';

type TypeOrValue<Keys extends string | number | symbol> = Keys | (string & { value?: any });

type PaletteColor = Exclude<ThemeColor, 'default' | 'dark'> | 'frame';
type Opacity = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100;
type TokenColor = PaletteColor | `${PaletteColor}-${ThemeShade}` | `${ThemeShade}/${Opacity}`;
type TokenTuple = [TypeOrValue<TokenColor | ThemeShade>, TypeOrValue<TokenColor | ThemeShade>?];
type TokenValue = TypeOrValue<TokenColor | ThemeShade> | TokenTuple;

type TokenVariantModifier = {
	text?: string[];
	container?: string[];
};

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
	variant?: string | string[]; // if undefined use key name.
	modifiers: TokenVariantModifier;
	text?: TokenConfInit | TokenConfHandler;
	container?: TokenConfInit | TokenConfHandler;
};

type TokenMap = Record<string, TokenVariant>;

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

export let defaultTokens = getDefaultTokens();

function getDefaultTokens(conf = {} as any) {

	return {

		// Main Configurations

		filled: {
			modifiers: {
				text: ['text'],
				container: ['bg', 'stroke', 'fill', 'even:bg', 'odd:bg']
			},
			text: {
				...placeholder,
				$base: 'text-white'
			},
			container: {
				default: [500, 500],
				dark: [700, 950],
				primary: [500, 500],
				secondary: [500, 500],
				tertiary: [500, 500],
				danger: [500, 500],
				warning: [500, 500],
				success: [500, 500],
				info: [500, 500],
			}
		},

		outlined: {
			modifiers: {
				text: ['text'],
				container: ['outline', 'ring', 'border']
			},
			text: {
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
			container: 'filled.container'
		},

		ghost: {
			modifiers: {
				text: ['text'],
			},
			text: () => extend('outlined.text', {
				dark: ['text-white', 'text-current'],
			}),
		},

		soft: {
			modifiers: {
				text: ['text'],
				container: ['bg']
			},
			text: 'outlined.text',
			// text: {
			// 	...placeholder,
			// 	$base: 'text-current'
			// },
			container: {
				default: [200, '500/20'],
				dark: [300, 'frame-950/40'],
				primary: [100, '500/20'],
				secondary: [100, '500/20'],
				tertiary: [100, '500/20'],
				danger: [100, '500/20'],
				warning: [100, '500/20'],
				success: [100, '500/20'],
				info: [100, '500/20'],
			}
		},

		// Selected, Expanded, Current Hover states etc...

		hoverGhost: {
			variant: 'ghost',
			modifiers: {
				text: ['hover:text'],
				container: ['hover:bg']
			},
			text: {
				dark: 'white'
			},
			container: {
				default: ['frame-500/20', 'frame-500/20'],
				dark: ['frame-700/70', 'frame-950/40'],
				primary: ['500/20', '500/20'],
				secondary: ['500/20', '500/20'],
				tertiary: ['500/20', '500/20'],
				danger: ['500/20', '500/20'],
				warning: ['500/20', '500/20'],
				success: ['500/20', '500/20'],
				info: ['500/20', '500/20']
			}
		},

		selectedBg: {
			variant: 'common',
			modifiers: {
				text: ['aria-selected:text', 'aria-expanded:text', 'aria-current:text'],
				container: [
					'aria-selected:bg',
					'aria-expanded:bg',
					'aria-current:bg',
				]
			},
			// text: {
			// 	...placeholder,
			// 	$base: 'text-white'
			// },
			container: () => extend('filled.container', {
				$base: {
					$base: 'bg-gray-100 dark:bg-frame-700 aria-expanded:text-white',
				}
			})
		},

		selectedText: {
			variant: 'common',
			modifiers: {
				text: ['aria-selected:text', 'aria-expanded:text', 'aria-current:text'],
				container: [
					'aria-selected:bg',
					'aria-expanded:bg',
					'aria-current:bg',
				]
			},
			text: () => extend('outlined.text', {
				default: ['primary-500', 'primary-400'],
				dark: ['primary-500', 'primary-400']
			})
		},

		focusOutline: {
			variant: 'common',
			// variant: ['filled', 'outlined', 'ghost', 'soft'],
			modifiers: {
				container: [...focusOutlineModifiers]
			},
			container: {
				default: ['frame-500/50', 'frame-500/50'],
				dark: ['frame-700/50', 'frame-950/50'],
				primary: ['500/50', '500/50'],
				secondary: ['500/50', '500/50'],
				tertiary: ['500/50', '500/50'],
				danger: ['500/50', '500/50'],
				warning: ['500/50', '500/50'],
				success: ['500/50', '500/50'],
				info: ['500/50', '500/50']
			}
		},

		focusRing: {
			variant: 'common',
			// variant: ['filled', 'outlined', 'ghost', 'soft'],
			modifiers: {
				container: [...focusRingModifiers]
			},
			container: {
				default: ['frame-500/50', 'frame-500/50'],
				dark: ['frame-700/50', 'frame-950/50'],
				primary: ['500/50', '500/50'],
				secondary: ['500/50', '500/50'],
				tertiary: ['500/50', '500/50'],
				danger: ['500/50', '500/50'],
				warning: ['500/50', '500/50'],
				success: ['500/50', '500/50'],
				info: ['500/50', '500/50']
			}
		}

	} as TokenMap;

}

function ensureArray<T = any>(value: T | T[]): T[] {
	if (Array.isArray(value) || typeof value === 'undefined' || value === null)
		return value || [];
	return [value];
}

function getConfig(
	tokens: Record<string, unknown>,
	obj?: string | Record<string, unknown> | TokenConfHandler
) {
	defaultTokens = defaultTokens || getDefaultTokens();
	if (typeof obj === 'function') obj = obj(defaultTokens);
	if (typeof obj === 'string') return getConfig(tokens, getProperty(tokens, obj));
	return obj;
}


function extend(path: string | Record<string, unknown>, ...obj: Record<string, unknown>[]): any {
	defaultTokens = defaultTokens || getDefaultTokens();
	const existing =
		typeof path === 'string'
			? getConfig(defaultTokens, getProperty(defaultTokens, path)) || {}
			: {};
	const next = obj.shift() || {} as TokenVariant;
	if (obj.length) return extend({ ...existing, ...next }, ...obj);
	return { ...existing, ...next };
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

function createResult(name: string, content: string[]) {
	return `export const ${name} = {\n${content.join(',\n')}\n};`;
}


export function parseTokens<
	T extends TokenMap
>(tokens: T) {

	function normalizeToken(
		value?: TokenValue,
		color?: ThemeColor | 'white' | 'black' | 'frame'
	): null | string {

		if (!value) return null;

		if (['default', 'dark'].includes(color || ''))
			color = 'frame';

		// if value contains dot notation get property value
		// by using getter, then recurse.
		if (typeof value === 'string' && value.includes('.'))
			return normalizeToken(getProperty(tokens as Record<string, any>, value), color);

		// Value is numeric color level or color level with opacity modifier, combine with color.
		// ex: 500 or '500/50';
		if (
			(typeof value === 'number' ||
				(typeof value === 'string' && value.includes('/') && !value.includes('-'))) &&
			color
		)
			return `${color}-${value}`;

		if (typeof value === 'string') return value;

		return null;

	}

	function getTuple(
		value: TokenValue,
		color: ThemeColor | 'white' | 'black' | 'frame'
	): [string | null, string | null] {
		if (['default', 'dark'].includes(color))
			color = 'frame';
		if (Array.isArray(value)) {
			const light = normalizeToken(value[0], color);
			const dark = normalizeToken(value[1], color);
			return [light, dark];
		}

		const light = normalizeToken(value, color);
		return [light, null];

	}

	function buildClass(modifier: string, conf?: TokenConfInit | TokenConfHandler) {
		if (!conf) return [];

		const { $base, ...nConf } = getConfig(tokens, conf) as TokenConf;

		const result = [];
		const extend = (typeof $base === 'string' ? { $base } : $base || { $base: '' }) as Partial<
			Record<ThemeColor | '$base', TokenColor>
		>;

		if (extend.$base) result.push(`  ${'$base'}: '${extend.$base}'`);

		for (const [color, token] of Object.entries(nConf)) {
			const [light, dark] = getTuple(token as TokenValue, color as ThemeColor);
			let str = '';
			if (light) str += !light.includes(':') ? modifier + '-' + light : ' ' + light;
			if (dark) str += !dark.includes(':') ? ' dark:' + (modifier + '-' + dark) : ' ' + dark;
			if (extend[color as ThemeColor]) str = extend[color as ThemeColor] + ' ' + str;
			result.push(`  ${color}: '${str}'`);
		}

		return result;
	}

	const result = {} as Record<string, string>;
	// const resultAliases = {} as Record<string, string>;
	const keys = [] as string[];

	for (const [gKey, gConf] of Object.entries(tokens)) {

		const {
			modifiers: modifiersMap,
			variant,
			...items
		} = getConfig(tokens, gConf) as TokenVariant;

		for (const [iKey, iConf] of Object.entries(items)) {

			const variants = ensureArray<string>(variant || gKey);
			const modifiers = modifiersMap[iKey as keyof typeof modifiersMap] || []; // get modifier collection.

			for (const m of modifiers) {
				const str = buildClass(m, iConf); // generate the Tailwind class prefixed with modifier.
				if (!str.length) continue;
				const suffix = createLabel(m);
				variants.forEach((v) => {
					const aName = v.toLowerCase() + suffix;
					if (keys.includes(aName))
						throw new Error(`Detected duplicate generated key/alias name ${aName}.`);
					keys.push(aName);
					result[aName] = createResult(aName, str); // createAlias(name, aName);
				});

			}

		}

	}

	const resultMap = Object.keys(result)
		.sort()
		.map((k) => result[k]);
	return resultMap.join('\n\n');

}

// bg-[rgb(var(--color-primary-600))]/[0.50]
// bg-[rgb(var(--color-primary-600))]/30
// hex example.
// text-[color:var(--text-light-hover)]



// type TokenColorRGB<P extends 'rgb' | 'rgba' = 'rgba' | 'rgb'> =
// 	| `${P}(${number},${number},${number})`
// 	| `${P}(${number},${number},${number},${number})`;
// type TokenColorHSL<P extends 'hsl' | 'hsla' = 'hsl' | 'hsla'> =
// 	| `${P}(${number},${string},${string})`
// 	| `${P}(${number},${string},${string},${number})`;
// type TokenColorHex = `#${string}` | `#${string}/${number}`;
// type TokenColorVar = `--${string}`; // Make a repeating pattern type to force strict --value-value-value?
// type TokenColorBase =
// 	| `--${string}`
// 	| TokenColorHex
// 	| TokenColorRGB
// 	| TokenColorHex
// 	| TokenColorVar
// 	| TokenColorHSL
// 	| `${ThemeColor}-${ThemeShade}/${number}`
// 	| `${ThemeColor}-${ThemeShade}`
// 	| number;

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
