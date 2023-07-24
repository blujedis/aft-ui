import type { SelectStore, SelectValue } from '$lib/stores/select';
import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeSize,
	ThemeTransitioned
} from '../../types';
import type { ButtonProps } from '../Button/module';
import type { ButtonGroupItemVariant } from '../ButtonGroupItem';

export type ButtonGroupProps = Omit<ButtonProps<'button' | 'a'>, 'disabled' | 'variant'> & {
	multiple?: boolean;
	selected?: SelectValue | SelectValue[];
	variant?: ButtonGroupItemVariant;
};

export type ButtonGroupContext = SelectStore & {
	globals: {
		focused: ThemeFocused;
		full: boolean;
		rounded: ThemeRounded;
		size: ThemeSize;
		theme: ThemeColor;
		transitioned: ThemeTransitioned;
		variant: ButtonGroupItemVariant;
	};
};

export const buttonGroupDefaults: Partial<ButtonGroupProps> = {
	focused: 'visible',
	rounded: 'none',
	shadowed: 'none',
	theme: 'default',
	variant: 'filled'
};
