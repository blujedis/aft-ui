import type {
	ThemeColor,
	ThemeFocused,
	ThemeResize,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '../../theme';
import type { textarea } from './config';

export type TextareaVariant = keyof typeof textarea;

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
	theme: 'light',
	variant: 'default'
};
