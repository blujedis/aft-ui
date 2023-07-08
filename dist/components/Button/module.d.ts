import type {
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '../../theme';
import type { ThemeColor } from '../../theme';
import type { button } from './config';
export type ButtonVariant = keyof typeof button;
export type ButtonProps<Tag extends 'button' | 'a'> = {
	as?: Tag;
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	underlined?: boolean;
	variant?: ButtonVariant;
	unstyled?: boolean;
};
export declare const buttonDefaults: Partial<ButtonProps<'button'>>;
