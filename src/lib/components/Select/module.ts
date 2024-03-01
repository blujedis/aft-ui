import type { SelectStoreValue, SelectStore } from '$lib/stores/select';
import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type SelectVariant = 'filled' | 'outlined' | 'soft' | 'flushed' | 'text'; // keyof typeof select;

export type SelectValue = string | number;

export type SelectContext = SelectStore & {
	//
};

export type SelectProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	hovered?: boolean;
	multiple?: boolean;
	placeholder?: boolean | string;
	rows?: number; // mapped to native size attribute.
	rounded?: ThemeRounded;
	value?: SelectStoreValue | SelectStoreValue[];
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: SelectVariant;
};

export const selectDefaults: Partial<SelectProps> = {
	size: 'md',
	theme: 'frame',
	variant: 'outlined',
	value: ''
};
