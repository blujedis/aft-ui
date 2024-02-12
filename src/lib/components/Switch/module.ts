import type { ThemeColor,  ThemeShadowed, ThemeSize } from '$lib/types';

export type SwitchProps = {
	position?: 'right' | 'left' | 'top' | 'bottom'; // relative to slot element
	classHandle?: string;
	classFill?: string;
	classBackdrop?: string;
	disabled?: boolean;
	focused?: boolean;
	hovered?: boolean;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	srtext?: string;
	theme?: ThemeColor;
	transitioned?: boolean;
};

export const switchDefaults: Partial<SwitchProps> = {
	size: 'md',
	srtext: 'Use Switch',
	theme: 'frame',
	position: 'right'
};
