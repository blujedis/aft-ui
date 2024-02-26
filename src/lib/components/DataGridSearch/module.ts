import type { ThemeColor, ThemeFocused, ThemeSize } from '$lib/types';

export type DataGridSearchProps = {
	action?: string;
	focused?: ThemeFocused;
	method?: string;
	rounded?: ThemeSize;
	size?: ThemeSize;
	strategy?: 'input' | 'submit';
	theme?: ThemeColor;
};

export const gridSearchDefaults: Partial<DataGridSearchProps> = {
	focused: true,
	strategy: 'input'
};
