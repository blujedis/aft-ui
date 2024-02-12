import type {
	ThemeColor,
	ThemeFocused,
	ThemeResize,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
} from '$lib/types';

export type TextareaVariant = 'outlined' | 'soft' | 'text';  

export type TextareaProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	hovered?: boolean;
	resize?: ThemeResize;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: TextareaVariant;
};

export const textareaDefaults: Partial<TextareaProps> = {
	focused: true,
	resize: 'both',
	rounded: 'sm',
	size: 'md',
	theme: 'frame',
	variant: 'outlined'
};
