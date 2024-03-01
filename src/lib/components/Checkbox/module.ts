import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type CheckboxVariant = 'outlined';

export type CheckboxProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	hovered?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: CheckboxVariant;
	unstyled?: boolean;
};

export const checkboxDefaults: Partial<CheckboxProps> = {
	focused: true,
	size: 'md',
	variant: 'outlined'
};
