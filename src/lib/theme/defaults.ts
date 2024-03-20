import type { ThemeDefaults } from '../types/theme';

const component = {
	focused: true,
	hovered: true,
	rounded: 'sm',
	shadowed: 'none',
	size: 'md',
	theme: 'frame',
	transitioned: true
} as ThemeDefaults['component'];

const defaults: ThemeDefaults = {
	component
};

export default defaults;
