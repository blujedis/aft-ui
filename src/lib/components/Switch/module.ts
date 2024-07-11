import type { ThemeColor, ThemeShadowed, ThemeSize } from '$lib/types';

export type SwitchProps = {
	classHandle?: string;
	classSlider?: string;
	disabled?: boolean;
	focused?: boolean;
	hovered?: boolean;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	srtext?: string;
	theme?: ThemeColor;
	transitioned?: boolean;
	unlabeled?: boolean;
};

export const switchDefaults: Partial<SwitchProps> = {
	size: 'md',
	srtext: 'Toggle Switch',
	theme: 'frame'
};
