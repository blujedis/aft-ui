import type { ThemeDefaults } from '../types/theme';

const component = {
	focused: 'visible',
	// rounded: 'sm',
	// shadowed: undefined,
	size: 'md',
	theme: 'light',
	transitioned: true
} as ThemeDefaults['component'];

const defaults: ThemeDefaults = {
	global: {
		bg: 'bg-white',
		text: 'text-frame-700'
	},
	component
};

export default defaults;
