import type { ThemeColor, ThemeShade } from '../types';
import { colors as baseColors } from '../constants/colors';
import { getProperty } from 'dot-prop';
import { mergeConfigs } from './utils';

type TypeOrValue<Keys extends string | number | symbol> = Keys | (string & { value?: any });

type TokenOpacity =
	| 0
	| 5
	| 10
	| 15
	| 20
	| 25
	| 30
	| 35
	| 40
	| 45
	| 50
	| 55
	| 60
	| 65
	| 70
	| 75
	| 80
	| 85
	| 90
	| 95
	| 100;
type TokenWidth = 0 | 1 | 2 | 3 | 4 | 8;
type TokenColor = ThemeColor | `${ThemeColor}-${ThemeShade}` | `${ThemeColor}-${ThemeShade}/${TokenOpacity}` | `${ThemeShade}/${TokenOpacity}` | ThemeShade;
type TokenTuple = [TypeOrValue<TokenColor>, TypeOrValue<TokenColor>?];
type TokenValue = TypeOrValue<TokenColor> | TokenTuple;

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
	bodyTextLight: TokenColor;
	bodyTextDark: TokenColor;
	bodyBgLight: TokenColor;
	bodyBgDark: TokenColor;

	defaultShade: ThemeShade;
	defaultSelectedShade: ThemeShade;
	softShade: TokenColor;
	softSelectedShade: TokenColor;
	hoverShade: TokenColor;
	focusShade: TokenColor;
	placeholderShade: TokenColor;

	disabledOpacity: TokenOpacity;

	focusOffset: TokenWidth;
	focusWidth: number;

	formBorderLight: TokenColor;
	formBorderDark?: TokenColor;

	panelBgLight: TokenColor;
	panelBgDark: TokenColor;

	dividerLight: TokenColor;
	dividerDark: TokenColor;

	dividerContrastLight: TokenColor;
	dividerContrastDark: TokenColor;

	panelContainerBgLight: TokenColor;
	panelContainerBgDark: TokenColor;

	panelBorderLight: TokenColor;
	panelBorderDark: TokenColor;

	elementBgLight: TokenColor;
	elementBgDark: TokenColor;
}
const colors = ['white', 'black', ...baseColors] as ThemeColor[];

const focusOutlineModifiers = [
	'focus:outline',
	'focus-visible:outline',
	'focus-within:outline',
	'peer-focus:outline',
	'group-focus:outline',
	'group-focus-within:outline'
];

const selectedBgModifiers = [
	'aria-selected:bg',
	'aria-expanded:bg',
	'aria-checked:bg'
];

const selectedTextModifiers = [
	'aria-selected:text',
	'aria-expanded:text',
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
	defaultSelectedShade: 600,
	softShade: '500/15',
	softSelectedShade: '500/25',
	focusShade: '500/30',
	hoverShade: '500/20',
	placeholderShade: 200,

	disabledOpacity: 60,

	focusOffset: 1,
	focusWidth: 3,

	// Below require theme color prefix e.g. frame-

	formBorderLight: 'frame-950/20',
	formBorderDark: 'frame-600',

	panelBgLight: 'white',
	panelBgDark: 'frame-800',

	dividerLight: 'frame-950/10',
	dividerDark: 'frame-600/60',

	dividerContrastLight: 'frame-950/30',
	dividerContrastDark: 'frame-600',

	panelContainerBgLight: 'frame-100',
	panelContainerBgDark: 'frame-900',

	panelBorderLight: 'frame-950/5',
	panelBorderDark: 'frame-600/60',

	elementBgLight: 'frame-100/70',
	elementBgDark: 'frame-700/70'
} as GenerateOptions;

function getDefaultTokens(options: Required<GenerateOptions>, themeColors = colors) {
	const {
		bodyTextDark,
		bodyTextLight,
		defaultShade,
		softShade,
		softSelectedShade,
		focusShade,
		hoverShade,
		disabledOpacity,
		defaultSelectedShade,
		panelBgDark,
		panelBgLight,
		formBorderLight,
		formBorderDark,
		dividerLight,
		dividerDark,
		panelContainerBgLight,
		panelContainerBgDark,
		elementBgLight,
		elementBgDark,
		panelBorderLight,
		panelBorderDark
	} = options;

	return {


		// Borders

		borders: {
			variant: 'main',
			modifiers: [
				'ring',
				'border',
				'outline',
				'group-hover:border',
				'peer-focus:border',
				'peer-hover:border'
			],
			colors: () =>
				createColorMap(themeColors, defaultShade, true, {
					frame: [formBorderLight, formBorderDark],
				})
		},

		formBorder: {
			variant: 'form',
			modifiers: ['border'],
			colors: {
				$base: [formBorderLight, formBorderDark]
			}
		},

		panelBorder: {
			variant: 'panel',
			modifiers: ['border'],
			colors: {
				$base: [panelBorderLight, panelBorderDark]
			}
		},

		elementBorder: {
			variant: 'element',
			modifiers: ['border'],
			colors: {
				$base: [dividerLight, dividerDark]
			}
		},

		elementSoftBorder: {
			variant: 'elementSoft',
			modifiers: ['border'],
			colors: {
				$base: ['frame-950/5', dividerDark]
			}
		},


		elementDivide: {
			variant: 'element',
			modifiers: ['divide'],
			colors: {
				$base: [dividerLight, dividerDark]
			}
		},

		ringBorder: {
			variant: 'element',
			modifiers: ['ring'],
			colors: {
				$base: [dividerLight, dividerDark]
			}
		},

		// Backgrounds

		bg: {
			variant: 'main',
			modifiers: ['bg', 'even:bg', 'odd:bg'],
			colors: () =>
				createColorMap(themeColors, defaultShade, true, {
					frame: [500, 700]
				})
		},


		bgSoft: {
			variant: 'soft',
			modifiers: ['bg'],
			colors: createColorMap(themeColors, softShade, true, {
				frame: 'bg-frame-100 dark:bg-frame-500/20',
				white: ['white', 'white/20'],
				black: ['black/20', 'black/20']
			})
		},

		bgNotification: {
			variant: 'notification',
			modifiers: ['bg'],
			colors: {
				$base: `bg-frame-600 dark:bg-frame-100`
			}
		},

		bgTooltip: {
			variant: 'tooltip',
			modifiers: ['bg'],
			colors: () =>
				createColorMap(themeColors, defaultShade, true, {
					frame: `bg-${panelBgDark} dark:bg-${panelBgLight}`
				})
		},

		// Dividers are empty divs with bg.
		bgDivider: {
			variant: 'divider',
			modifiers: ['bg'],
			colors: () =>
				createColorMap(themeColors, defaultShade, true, {
					frame: [(dividerLight + '').replace('frame-', ''), (dividerDark + '').replace('frame-', '')]
				})
		},

		bgGhostHover: {
			variant: 'ghost',
			modifiers: ['hover:bg'],
			colors: createColorMap(themeColors, hoverShade, true, {
				frame: [100, hoverShade],
				white: ['frame-100', 'white/20'],
				black: ['black/20', 'black/20']
			})
		},

		// see aria-states: https://tailwindcss.com/docs/hover-focus-and-other-states#aria-states
		bgSelected: {
			variant: 'selected',
			modifiers: [
				'aria-selected:bg',
				'aria-expanded:bg',
				'aria-checked:bg',
				'aria-selected:border',
				'aria-[current="page"]:bg'
			],
			colors: 'bg.colors'
		},

		bgSelectedAccent: {
			variant: 'selectedAccent',
			modifiers: [...selectedBgModifiers],
			colors: createColorMap(themeColors, defaultSelectedShade, true, {
				frame: [300, 900]
			})
		},

		bgSelectedGhost: {
			variant: 'selectedGhost',
			modifiers: [...selectedBgModifiers],
			colors: 'bgHoverGhost.colors'
		},

		bgSelectedSoft: {
			variant: 'selectedSoft',
			modifiers: [...selectedBgModifiers],
			colors: createColorMap(themeColors, softSelectedShade, true, {
				frame: ['200/50', `${softSelectedShade}`]
			})
		},

		bgProgress: {
			variant: 'progress',
			modifiers: ['[&::-webkit-progress-value]:bg', '[&::-moz-progress-bar]:bg'],
			colors: () =>
				createColorMap(themeColors, defaultShade, false, {
					$base: `bg-frame-${softShade} [&::-webkit-progress-bar]:bg-frame-${softShade}`
				})
		},

		bgSelectOption: {
			variant: 'selectOption',
			modifiers: ['bg'],
			colors: () => createColorMap(themeColors, defaultShade, false)
		},

		bgSwitch: {
			variant: 'switch',
			modifiers: ['aria-checked:bg'],
			colors: () =>
				createColorMap(themeColors, defaultShade, true, {
					$base: `bg-frame-${hoverShade} dark:bg-frame-${hoverShade}`
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

		bgPanelHover: {
			variant: 'panel',
			modifiers: ['hover:bg'],
			colors: {
				$base: `hover:bg-frame-200/50 hover:dark:bg-frame-900/40`
			}
		},


		bgElement: {
			variant: 'element',
			modifiers: ['bg'],
			colors: {
				$base: `bg-${elementBgLight} dark:bg-${elementBgDark}`
			}
		},


		// Text Styles 

		textProgress: {
			variant: 'progress',
			modifiers: ['fill'],
			colors: () =>
				createColorMap(themeColors, defaultShade, true, {
					frame: [`${bodyTextLight}`, `${bodyTextDark}`]
				})
		},

		textTooltip: {
			variant: 'tooltip',
			modifiers: ['text'],
			colors: {
				...placeholder,
				$base: `text-${bodyTextDark} dark:text-${bodyTextDark}`,
				frame: [bodyTextDark, bodyTextLight]
			}
		},

		textNotification: {
			variant: 'notification',
			modifiers: ['text'],
			colors: {
				$base: `text-${bodyTextDark} dark:text-${bodyTextLight}`
			}
		},

		// Text with no overrides
		textDefault: {
			variant: 'default',
			modifiers: ['text'],
			colors: () => createColorMap(themeColors, defaultShade, getMin(defaultShade, -100, 400))
		},

		textPlaceholder: {
			variant: 'filled',
			modifiers: ['placeholder'],
			colors: () =>
				createColorMap(themeColors, getMin(defaultShade, -300, 200), true, {
					frame: 'placholder-frame-300',
					white: 'placeholder-frame-300',
					black: 'placeholder-frame-300'
				})
		},

		textUnfilled: {
			variant: 'unfilled',
			modifiers: ['text'],
			colors: () =>
				createColorMap(themeColors, defaultShade, getMin(defaultShade, -100, 400), {
					frame: [bodyTextLight, bodyTextDark],
					white: [bodyTextLight, bodyTextDark],
					black: `text-black  dark:text-${bodyTextDark}`
				})
		},

		textFilled: {
			variant: 'filled',
			modifiers: ['text'],
			colors: {
				$base: 'text-white dark:text-white',
				white: [bodyTextLight, bodyTextLight],
			},
		},

		textSoft: {
			variant: 'soft',
			modifiers: ['text'],
			colors: () => createColorMap(themeColors, defaultShade, getMin(defaultShade, -100, 400), {
				frame: `text-${bodyTextLight} dark:text-${bodyTextDark}`,
				white: `text-${bodyTextLight} dark:text-${bodyTextDark}`,
				black: `text-${bodyTextLight} dark:text-${bodyTextDark}`,
			})
		},

		textSelectedFilled: {
			variant: 'filled',
			modifiers: [...selectedTextModifiers],
			colors: {
				$base: [bodyTextDark, bodyTextDark]
			}
		},

		textSelectedUnfilled: {
			variant: 'unfilled',
			modifiers: [...selectedTextModifiers],
			colors: 'textUnfilled.colors'
		},

		textMuted: {
			variant: 'muted',
			modifiers: [],
			colors: {
				$base: `text-${bodyTextLight}/60 dark:text-${bodyTextDark}/40`
			}
		},

		textMutedSelected: {
			variant: 'muted',
			modifiers: ['text'],
			colors: {
				$base: `aria-selected:opacity-${disabledOpacity}`,
			}
		},

		// Misc Styles

		stroke: {
			variant: 'progress',
			modifiers: ['stroke'],
			colors: {
				$base: [`frame-${softShade}`, `frame-${softShade}`]
			}
		},

		icon: {
			variant: 'icon',
			modifiers: ['text', 'fill', 'stroke'],
			colors: () => createColorMap(themeColors, defaultShade, defaultShade)
		},

		outlineFocus: {
			variant: '',
			modifiers: [...focusOutlineModifiers],
			colors: createColorMap(themeColors, `${focusShade}`, true, {
				frame: [`${focusShade}`, `${focusShade}`]
			})
		},

		bgFocus: {
			variant: '',
			modifiers: ['focus:bg'],
			colors: createColorMap(themeColors, softShade, true, {
				frame: [100, '500/20']
			})
		}
	} as TokenMap;
}

function getCommon(options: Required<GenerateOptions>) {
	options = {
		...defaultOptions,
		...options
	};

	options.formBorderDark = options.formBorderDark || options.formBorderLight;

	const {
		disabledOpacity,
		focusOffset,
		focusWidth,
		defaultShade,
		softShade,
	} = options as Required<GenerateOptions>;

	const common = {

		// Focused
		focusedOutline: `outline-none focus:outline-[${focusWidth}px] focus:outline-offset-${focusOffset}`,
		focusedOutlineVisible: `outline-none focus-visible:outline-[${focusWidth}px] focus-visible:outline-offset-${focusOffset}`,
		focusedOutlineWithin: `outline-none focus-within:outline-[${focusWidth}px] focus-within:outline-offset-${focusOffset}`,
		focusedOutlineWithinVisible: `outline-none focus-within:[&:has(:focus-visible)]:outline-[${focusWidth}px] focus-within:[&:has(:focus-visible)]:outline-offset-${focusOffset}`,

		focusedRing: `outline-none focus:ring-[${focusWidth}px] focus:ring-offset-${focusOffset}`,
		focusedRingInset: `outline-none focus:ring-1 focus:ring-inset`,
		focusedRingVisible: `outline-none focus-visible:ring-[${focusWidth}px] focus-visible:ring-offset-${focusOffset}`,
		focusedRingWithin: `outline-none focus-within:ring-[${focusWidth}px] focus-within:ring-offset-${focusOffset}`,

		// Misc
		transitioned: 'transition motion-reduce:transition-none',
		disabled: `disabled:opacity-${disabledOpacity - 10} aria-disabled:opacity-${disabledOpacity - 10} dark:disabled:opacity-${disabledOpacity} dark:aria-disabled:opacity-${disabledOpacity} pointer-events-none`,

		// Values - makes various theme shade/color props availble to "common" options.

		rangeValue: `${defaultShade}`,
		rangeThumb: `${getMin(defaultShade, -200, 300)}`,
		rangeBgLight: `frame-200/50`,
		rangeBgDark: `frame-900/50`,

		// Text
		// muteSelected: `aria-selected:opacity-${disabledOpacity}`,
		// mutedText: `text-${bodyTextLight}/60 dark:text-${bodyTextDark}/40`,

		// Selected States
		// selectedBodyTextAriaSelected: `aria-selected:text-${bodyTextDark} dark:aria-selected:text-${bodyTextDark}`,
		// selectedBodyTextAriaExpanded: `aria-expanded:text-${bodyTextDark} dark:aria-expanded:text-${bodyTextDark}`,
		// selectedBodyTextAriaChecked: `aria-checked:text-${bodyTextDark} dark:aria-checked:text-${bodyTextDark}`,

		// Backgrounds
		// panelBg: `bg-${panelBgLight} dark:bg-${panelBgDark}`,
		// panelBgHover: 'hover:bg-frame-200/50 hover:dark:bg-frame-900/40',
		// panelContainerBg: `bg-${panelContainerBgLight} dark:bg-${panelContainerBgDark}`,
		// elementBg: `bg-${elementBgLight} dark:bg-${elementBgDark}`,


		// Bordering
		// ringed: `ring-${dividerLight} dark:ring-${dividerDark}`,
		// bordered: `border-${dividerLight} dark:border-${dividerDark}`,
		// divided: `divide-${dividerLight} dark:divide-${dividerDark}`,
		// elementBorder: `border-${dividerLight} dark:border-${dividerDark}`,
		// formBorder: `border-${formBorderColorLight} dark:border-${formBorderColorDark}`,
		// panelBorder: `border-${panelBorderLight} dark:border-${panelBorderDark}`,

		// Strokes & Fills
		// progressStroke: `stroke-frame-${softShade} dark:stroke-frame-${softShade}`,

	};

	return objectToString('common', common);
}

// ex: getMin(40, 50, 10) = 10
// subtracting 50 from 40 = -10 but our min val was set to 10
// Math.max will choose the larger  number between -10 and 10.
function getMin(value: number, offset = 0, min = 0) {
	return Math.max(min, value + offset);
}

// ex: getMax(40, 50, 60) = 60
// adding 40 to 50 = 90 but our max val was set to 60
// Math.min will choose the lower or our max between 60 and 90.
// function getMax(value: number, offset = 0, max = 0) {
// 	return Math.min(max, value + offset);
// }

function createColorMap(
	colors: readonly ThemeColor[],
	light: string | number,
	dark?: string | number | boolean,
	override?: Partial<Record<ThemeColor | '$base', any>>
) {
	const result = colors.reduce(
		(a, c) => {
			if (['white', 'black'].includes(c)) {
				a[c as ThemeColor] = [c, c];
				return a;
			}
			if (dark === true) dark = light;
			if (!dark && light) a[c as ThemeColor] = light;
			else if (light && dark) a[c as ThemeColor] = [light, dark];
			return a;
		},
		{} as Record<ThemeColor, string | number | [string | number, string | number]> & {
			$base: string;
		}
	);
	if (typeof override !== 'undefined') return { ...result, ...override };
	return result;
}

function toCamelCase(arr: string[]) {
	arr = arr.filter((v) => {
		return v.length > 0;
	});
	return arr
		.reduce((result, curr, i) => {
			if (i === 0) {
				result.push(curr.toLowerCase());
			} else {
				result.push(curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase());
			}
			return result;
		}, [] as string[])
		.join('');
}

function ensureArray<T = any>(value: T | T[]): T[] {
	if (Array.isArray(value) || typeof value === 'undefined' || value === null) return value || [];
	return [value];
}

function objectToString(name: string, obj: Record<string, any>, level = 1, indent = 2): string {
	const template =
		level > 1 ? `{\n{0}\n${' '.repeat(indent)}}` : `export const ${name} ={\n{0}\n};`;

	const rows = [];

	for (const [key, val] of Object.entries(obj)) {
		if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
			const nestedVal = objectToString(key, val, (level += 1));
			rows.push(`${' '.repeat(indent)}${key}: ${nestedVal}`);
		} else {
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

function capitalizeEach(values = [] as string[]): string[] {
	return values.map((v) => v.charAt(0).toUpperCase() + v.slice(1));
}

function flattenArray(arr: any[]): any[] {
	return arr.reduce((a, c) => a.concat(c), []);
}

function splitWhen(value: string | string[], tokens: string[]): string[] {
	const nextToken = tokens.shift();
	if (!nextToken) return ensureArray(value);
	return flattenArray(ensureArray(value).reduce((a, c) => {
		if (c.includes(nextToken)) {
			const split = c.split(nextToken)
			a = [...a, ...splitWhen(split, tokens)];
		}
		else {
			a = [...a, c]
		}
		return a;
	}, [] as string[])).filter(v => v !== '');
}

function createLabel(modifier: string) {
	const mod = modifier.split(':');
	const type = mod.pop()?.split('-')[0];
	if (!type) throw new Error(`Failed to create token group label using modifier ${modifier}`);
	const suffix = capitalizeEach(splitWhen(mod, ['-', '[', '='])).join('').replace(/['"&[\]>]/g, '');
	return type.charAt(0).toUpperCase() + type.slice(1) + suffix;
}

function normalizeToken(
	tokens?: Record<string, any>,
	value?: TokenValue,
	color?: ThemeColor | 'white' | 'black' | 'frame'
): null | string {
	if (!value) return null;

	// Value is numeric color level.
	if (color && typeof value === 'number') return `${color}-${value}`;

	if (typeof value === 'string') {
		// if value contains dot notation get property value
		// by using getter, then recurse.
		if (typeof value === 'string' && value.includes('.'))
			return normalizeToken(getProperty(tokens, value), color);

		// color level with opacity modifie ex 500/50
		if (color && value.includes('/') && !value.includes('-')) {
			const [shade,] = value.split('/');
			const result = shade === color ? value : `${color}-${value}`;
			return result;
		}

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

function buildClassItem(
	tokens: Record<string, any>,
	modifier: string,
	color: string,
	token: TokenValue
) {
	if (typeof token === 'string') {
		token = token.trim();
		// manually defined row
		if (/\s/.test(token)) return token;
	}
	color = color === '$base' ? 'frame' : color; // if $base is present set to default color.
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

function buildClass(
	tokens: Record<string, any>,
	modifier: string,
	conf?: TokenConfInit | TokenConfHandler
) {
	if (!conf) return [];


	const _conf = { ...placeholder, ...getConfig(tokens, conf) };
	const { $base, ...nConf } = _conf as TokenConf;
	const result = {} as Record<string, any>;

	const extend = (
		typeof $base === 'string' || Array.isArray($base) ? { $base } : $base || { $base: '' }
	) as Partial<Record<ThemeColor | '$base', any>>;

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

export function generateTokens(options?: Partial<GenerateOptions>) {
	options = {
		...defaultOptions,
		...options
	};

	const tokens = getDefaultTokens(options as Required<GenerateOptions>);

	// const result = [] as string[];
	const tmp = {} as Record<string, string>;
	const keys = [] as string[];
	const common = getCommon(options as Required<GenerateOptions>);

	for (const [_gKey, gConf] of Object.entries(tokens)) {

		const { modifiers, variant, colors } = getConfig(tokens, gConf) as TokenVariant;

		const modifiersArr = ensureArray(modifiers);

		for (const m of modifiersArr) {
			const prefix = (variant || '').split(/(?=[A-Z])/);
			let suffix = createLabel(m);
			if (!(variant || '').length) suffix = suffix.charAt(0).toLocaleLowerCase() + suffix.slice(1);
			let name = toCamelCase([...prefix, ...suffix.split(/(?=[A-Z])/)]);
			// below needed for when you create a modifier
			// like [some-tag]:bg
			if (name.includes('[')) {
				const [nPrefix, nSuffix] = name.split('[');
				name = `${nPrefix}${nSuffix.charAt(0).toUpperCase() + nSuffix.slice(1)}`
			}

			if (keys.includes(name))
				throw new Error(`Detected duplicate generated key/alias name ${name}.`);
			const obj = buildClass(tokens, m, colors);
			// result.push(objectToString(name, obj));
			tmp[name] = objectToString(name, obj);
			keys.push(name);
		}
	}

	const result = keys.sort().reduce((a, c) => [...a, tmp[c]], [] as string[]);
	result.unshift(common);

	return result.join('\n\n');

}

// bg-[rgb(var(--color-primary-600))]/[0.50]
// bg-[rgb(var(--color-primary-600))]/30
// hex example.
// text-[color:var(--text-light-hover)]
