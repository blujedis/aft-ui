import type {
	ThemeColor,
	ThemeFocused,
	ThemeResize,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
	ThemeVariant
} from '../../types';
// import type { textarea } from './config';

export type TextareaVariant = Exclude<ThemeVariant, 'text' | 'flushed'>; //  keyof typeof textarea;

export type TextareaProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	resize?: ThemeResize;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: TextareaVariant;
	unstyled?: boolean;
};

export const textareaDefaults: Partial<TextareaProps> = {
	focused: true,
	resize: 'both',
	rounded: 'sm',
	size: 'md',
	theme: 'default',
	variant: 'outlined'
};
