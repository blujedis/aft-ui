import type { ThemeColor, ThemeSize } from '$lib/types';

export type SelectOptionVariant = 'outlined'; 

export type SelectOptionProps = {
	disabled?: boolean;
	full?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	value: string | number;
	variant?: SelectOptionVariant;
	unstyled?: boolean;
};

export const selectOptionDefaults: Partial<SelectOptionProps> = {
	size: 'md',
	theme: 'frame',
	variant: 'outlined'
};
