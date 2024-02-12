import type { SelectStore, SelectStoreValue } from '$lib/stores/select';
import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeSize,
} from '$lib/types';
import type { ButtonProps } from '../Button/module';
import type { ButtonGroupVariant } from '../ButtonGroupItem';

export type ButtonGroupProps = Omit<ButtonProps<'button' | 'a'>, 'disabled' | 'variant'> & {
	multiple?: boolean;
	selected?: SelectStoreValue | SelectStoreValue[];
	variant?: ButtonGroupVariant;
};

export type ButtonGroupContext = SelectStore & {
	globals: {
		focused: ThemeFocused;
		full: boolean;
		hovered: boolean;
		rounded: ThemeRounded;
		size: ThemeSize;
		theme: ThemeColor;
		transitioned: boolean;
		variant: ButtonGroupVariant;
	};
};

export const buttonGroupDefaults: Partial<ButtonGroupProps> = {
	hovered: true,
	rounded: 'none',
	shadowed: 'none',
	variant: 'filled'
};
