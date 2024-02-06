
import type { ThemeColor, ThemeShade } from '../types';
import { colors } from '../constants/colors';
import { getProperty } from 'dot-prop';

type TypeOrValue<Keys extends string | number | symbol> = Keys | (string & { value?: any });

type PaletteColor = Exclude<ThemeColor, 'default' | 'dark'> | 'frame';
type Opacity = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100;
type TokenColor = PaletteColor | `${PaletteColor}-${ThemeShade}` | `${ThemeShade}/${Opacity}`;
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
	bodyTextLight: number;
	bodyTextDark: number;
	bodyBgLight: number;
	bodyBgDark: number;
	shade: number;
	opacitySoft: number;
	opacityHover: number;
	opacityFocus: number;
	opacitySoftSelected: number;
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

const defaultOptions = {
	bodyTextLight: 700,
	bodyTextDark: 100,
	bodyBgLight: 50,
	bodyBgDark: 800,
	shade: 500,
	opacitySoft: 20,
	opacityHover: 20,
	opacityFocus: 50,
	opacitySoftSelected: 70
} as GenerateOptions;

export let defaultTokens = getDefaultTokens();

function getDefaultTokens(options?: Partial<GenerateOptions>) {

	options = {
		...defaultOptions,
		...options
	};

	const {
		bodyTextLight, bodyTextDark, bodyBgLight, bodyBgDark,
		shade, opacitySoft, opacityHover, opacitySoftSelected, opacityFocus
	} = options as Required<GenerateOptions>;

	return {

		bg: {
			variant: 'main',
			modifiers: ['bg', 'stroke', 'fill', 'even:bg', 'odd:bg', 'ring', 'border', 'outline'],
			colors: () => createColorMap(colors, shade, true)
		},

		text: {
			variant: 'main',
			modifiers: ['text'],
			colors: () => createColorMap(colors, shade, shade - 100, { frame: '' })
		},

		textWhite: {
			variant: 'white',
			modifiers: ['text'],
			colors: {
				$base: `${toColor('text', 'frame', bodyTextDark)} ${toColor('dark:text', 'frame', bodyTextDark)}`
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
			colors: createColorMap(colors, `${shade}/${opacitySoft}`, true, {
				frame: [`500/${opacitySoft - 10}`, `${shade}/${opacitySoft}`]
			})
		},

		bgPanel: {
			variant: 'panel',
			modifiers: ['bg'],
			colors: {
				$base: `bg-frame-${shade}/${opacitySoft - 10} dark:bg-frame-${shade}/${opacitySoft}`
			}
		},

		bgHoverGhost: {
			variant: 'ghost',
			modifiers: ['hover:bg'],
			colors: createColorMap(colors, `${shade}/${opacityHover}`, true)
		},

		bgHoverSoft: {
			variant: 'soft',
			modifiers: ['hover:bg'],
			colors: createColorMap(colors, `${shade}/${20}`, true)
		},

		bgHoverPanel: {
			variant: 'panel',
			modifiers: ['hover:bg'],
			colors: {
				$base: 'hover:brightness-150 dark:hover:brightness-125'
			}
		},

		bgHoverPanelSoft: {
			variant: 'panelSoft',
			modifiers: ['hover:bg'],
			colors: {
				$base: `hover:bg-frame-50 dark:hover:bg-frame-${shade}/${opacitySoft - 10}`
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
			colors: createColorMap(colors, `${shade}/${opacitySoftSelected}`, true)
		},

		textSelected: {
			variant: 'selected',
			modifiers: [...selectedTextModifiers],
			colors: 'text.colors'
		},

		textSelectedWhite: {
			variant: 'selectedWhite',
			modifiers: [...selectedTextModifiers],
			colors: createColorMap(colors, toColor('text', 'frame', bodyTextDark), toColor('text', 'frame', bodyTextDark))
		},

		textSelectedGhost: {
			variant: 'selectedGhost',
			modifiers: [...selectedTextModifiers],
			colors: 'text.colors'
		},

		outlineFocus: {
			variant: '',
			modifiers: [...focusOutlineModifiers],
			colors: createColorMap(colors, `${shade}/${opacityFocus}`, true)
		},

		ringFocus: {
			variant: '',
			modifiers: [...focusRingModifiers],
			colors: 'outlineFocus.colors'
		}

	} as TokenMap;

}

function toColor(type: string, color: ThemeColor, value: number, opacity?: number) {
	return opacity ? `${type}-${color}-${value}/${opacity}` : `${type}-${color}-${value}`;
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

function getConfig(
	tokens: Record<string, unknown>,
	obj?: string | Record<string, unknown> | TokenConfHandler
) {
	defaultTokens = defaultTokens || getDefaultTokens();
	if (typeof obj === 'function') {
		obj = obj(defaultTokens);
	}
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

function normalizeToken(
	tokens?: Record<string, any>,
	value?: TokenValue,
	color?: ThemeColor | 'white' | 'black' | 'frame'
): null | string {

	if (!value) return null;

	if (['default', 'dark'].includes(color || ''))
		color = 'frame';

	// if value contains dot notation get property value
	// by using getter, then recurse.
	if (typeof value === 'string' && value.includes('.'))
		return normalizeToken(getProperty(tokens, value), color);

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
	tokens: Record<string, any>,
	value: TokenValue,
	color: ThemeColor | 'white' | 'black' | 'frame'
): [string | null, string | null] {
	if (['default', 'dark'].includes(color))
		color = 'frame';
	if (Array.isArray(value)) {
		const light = normalizeToken(tokens, value[0], color);
		const dark = normalizeToken(tokens, value[1], color);
		return [light, dark];
	}

	const light = normalizeToken(tokens, value, color);
	return [light, null];

}

function buildClass(tokens: Record<string, any>, modifier: string, conf?: TokenConfInit | TokenConfHandler) {
	if (!conf) return [];
	const _conf = { ...placeholder, ...getConfig(tokens, conf) };
	const { $base, ...nConf } = _conf as TokenConf;
	const result = [];
	const extend = (typeof $base === 'string' ? { $base } : $base || { $base: '' }) as Partial<
		Record<ThemeColor | '$base', TokenColor>
	>;
	const suffix = modifier.split(':').pop();
	if (extend.$base) result.push(`  ${'$base'}: '${extend.$base}'`);

	for (const [color, token] of Object.entries(nConf)) {
		let [light, dark] = getTuple(tokens, token as TokenValue, color as ThemeColor);
		let str = '';
		light = light || '';
		dark = dark || '';
		light = light.replace(`${suffix}-`, '');
		dark = dark.replace(`${suffix}-`, '');
		if (light) str += !light.includes(':') ? modifier + '-' + light : ' ' + light;
		if (dark) str += !dark.includes(':') ? ' dark:' + (modifier + '-' + dark) : ' ' + dark;
		if (extend[color as ThemeColor]) str = extend[color as ThemeColor] + ' ' + str;
		result.push(`  ${color}: '${str}'`);
	}
	return result;
}

export function parseTokens<
	T extends TokenMap
>(tokens: T) {
	const result = {} as Record<string, string>;
	const keys = [] as string[];

	for (const [gKey, gConf] of Object.entries(tokens)) {

		const {
			modifiers,
			variant,
			colors
		} = getConfig(tokens, gConf) as TokenVariant;

		const modifiersArr = ensureArray(modifiers);

		for (const m of modifiersArr) {
			const str = buildClass(tokens, m, colors);
			if (!str.length) continue;

			const prefix = (variant || '').split(/(?=[A-Z])/);
			let suffix = createLabel(m);
			if (!(variant || '').length) {
				suffix = suffix.charAt(0).toLocaleLowerCase() + suffix.slice(1);
			}
			const name = toCamelCase([...prefix, ...suffix.split(/(?=[A-Z])/)]);

			if (keys.includes(name))
				throw new Error(`Detected duplicate generated key/alias name ${name}.`);
			keys.push(name);
			result[name] = createResult(name, str);
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
