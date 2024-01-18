import type { ThemeDefaults } from '../types/theme';

const component = {
	focused: true,
	hovered: true,
	rounded: 'none',
	shadowed: 'none',
	size: 'md',
	theme: 'default',
	transitioned: true
} as ThemeDefaults['component'];

const defaults: ThemeDefaults = {
	component
};

export default defaults;
