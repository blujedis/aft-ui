import type { ThemeColor, ThemeFocused, ThemeShadowed, ThemeSize } from '$lib/types';
import type { switchBackdrop } from './config';

export type SwitchVariant = keyof typeof switchBackdrop;

export type SwitchProps = {
	classHandle?: string;
	classFill?: string;
	classBackdrop?: string;
	disabled?: boolean;
	focused?: ThemeFocused;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	srtext?: string;
	theme?: ThemeColor;
	variant?: SwitchVariant;
	unstyled?: boolean;
};

export const switchDefaults: Partial<SwitchProps> = {
	focused: 'always',
	size: 'md',
	srtext: 'Use Switch',
	theme: 'frame',
	variant: 'default'
};
