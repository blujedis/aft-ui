import type { ThemeColor, ThemeSize, ThemeTransitioned } from '../../types';
// import type { selectOption } from './config';

export type SelectOptionVariant = 'outlined'; // keyof typeof selectOption;

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
	theme: 'default',
	variant: 'outlined'
};
