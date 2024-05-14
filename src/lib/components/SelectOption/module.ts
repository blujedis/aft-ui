import type { ThemeSize } from '$lib/types';

export type SelectOptionVariant = 'outlined';

export type SelectOptionProps = {
	disabled?: boolean;
	full?: boolean;
	size?: ThemeSize;
	value: string | number;
};

export const selectOptionDefaults: Partial<SelectOptionProps> = {
	size: 'md'
};
