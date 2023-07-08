import type { SelectValue, SelectStore } from '../../stores/select';
import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '../../theme';
import type { select } from './config';
export type SelectVariant = keyof typeof select;
export type SelectContext = SelectStore & {};
export type SelectProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	multiple?: boolean;
	placeholder?: boolean | string;
	rounded?: ThemeRounded;
	selected?: SelectValue | SelectValue[];
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: SelectVariant;
	unstyled?: boolean;
};
export declare const selectDefaults: Partial<SelectProps>;
