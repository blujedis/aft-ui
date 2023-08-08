const tinycolor = require('tinycolor2');
const defaultTailwindColors = require('tailwindcss/colors');

const defaultColors = {
	frame: {
		DEFAULT: '#6B7280',
		50: '#F9FAFA',
		100: '#EEEFF1',
		200: '#D0D2D8',
		300: '#B1B5BE',
		400: '#888E9B',
		500: '#6B7280',
		600: '#515761',
		700: '#383C43',
		800: '#25282C',
		900: '#151619',
		950: '#0E0F11'
	},
	primary: {
		DEFAULT: '#0D4C87',
		50: '#E3F0FC',
		100: '#CCE4FA',
		200: '#9DCBF6',
		300: '#6FB2F1',
		400: '#4099ED',
		500: '#1680E4',
		600: '#1166B6',
		700: '#0D4C87',
		800: '#09345D',
		900: '#051D33',
		950: '#03111E'
	},
	secondary: {
		DEFAULT: '#FF7057',
		50: '#FFDAD4',
		100: '#FFCBC2',
		200: '#FFAD9E',
		300: '#FF8E7B',
		400: '#FF7057',
		500: '#F04E2D',
		600: '#D32F12',
		700: '#A5240D',
		800: '#7D1908',
		900: '#550E02',
		950: '#430E04'
	},
	tertiary: {
		DEFAULT: '#999485',
		50: '#F7F6F5',
		100: '#ECECE9',
		200: '#D8D6D0',
		300: '#C3C0B7',
		400: '#AEAA9E',
		500: '#999485',
		600: '#7D7868',
		700: '#5F5B4F',
		800: '#403D35',
		900: '#21201C',
		950: '#12110F'
	},
	danger: {
		50: '#fff1f2',
		100: '#ffe4e6',
		200: '#fecdd3',
		300: '#fda4af',
		400: '#fb7185',
		500: '#f43f5e',
		600: '#e11d48',
		700: '#be123c',
		800: '#9f1239',
		900: '#881337',
		950: '#4c0519',
		DEFAULT: '#f43f5e'
	},
	warning: {
		50: '#fffbeb',
		100: '#fef3c7',
		200: '#fde68a',
		300: '#fcd34d',
		400: '#fbbf24',
		500: '#f59e0b',
		600: '#d97706',
		700: '#b45309',
		800: '#92400e',
		900: '#78350f',
		950: '#451a03',
		DEFAULT: '#f59e0b'
	},
	success: {
		50: '#ecfdf5',
		100: '#d1fae5',
		200: '#a7f3d0',
		300: '#6ee7b7',
		400: '#34d399',
		500: '#10b981',
		600: '#059669',
		700: '#047857',
		800: '#065f46',
		900: '#064e3b',
		950: '#022c22',
		DEFAULT: '#10b981'
	},
	info: {
		50: '#ecfeff',
		100: '#cffafe',
		200: '#a5f3fc',
		300: '#67e8f9',
		400: '#22d3ee',
		500: '#06b6d4',
		600: '#0891b2',
		700: '#0e7490',
		800: '#155e75',
		900: '#164e63',
		950: '#083344',
		DEFAULT: '#06b6d4'
	}
};

/**
 * @param {import('tinycolor2').ColorInput} color
 */
function getRgbChannels(color) {
	const c = tinycolor(color).toRgb();
	return `${c.r} ${c.g} ${c.b}`;
}

function generateRootVars(colors = defaultColors, name = '') {
	return Object.keys(colors).reduce((result, shadeOrObj) => {
		const value = colors[shadeOrObj];
		const key = shadeOrObj === 'DEFAULT' ? `--color${name}` : `--color${name}-${shadeOrObj}`;
		const currentResult =
			typeof value === 'string'
				? { [key]: getRgbChannels(value) }
				: generateRootVars(value, `-${shadeOrObj}`);
		return { ...result, ...currentResult };
	}, {});
}

function generateTailwindVars(colors = defaultColors, parent = '') {
	return Object.entries(colors).reduce((result, [key, value]) => {
		const colorName =
			parent === '' ? `${key}` : key === 'DEFAULT' ? `${parent}` : `${parent}-${key}`;
		const formattedValue = `rgb(var(--color-${colorName})/<alpha-value>)`;
		const currentResult =
			typeof value === 'string'
				? { [key]: formattedValue }
				: { [key]: generateTailwindVars(value, key) };
		return { ...result, ...currentResult };
	}, {});
}

const plugin =
	(colors) =>
	({ addBase, theme, addUtilities }) => {
		addBase({
			':root': {
				...generateRootVars(colors)
			}
		});
		addUtilities({
			'.text-md': {
				fontSize: '1.0rem',
				lineHeight: '1.5'
			}
		});
	};

exports.defaultColors = defaultColors;
exports.defaultTailwindColors = defaultTailwindColors;
exports.generateRootVars = generateRootVars;
exports.generateTailwindVars = generateTailwindVars;
exports.plugin = plugin;
