import type { ThemeColor, ThemeFocused, ThemeSize } from '$lib/types';
import type { DataGridVariant } from '../DataGrid/module';

export type DataGridSearchProps = {
	action?: string;
	focused?: ThemeFocused;
	method?: string;
	rounded?: ThemeSize;
	size?: ThemeSize;
	strategy?: 'input' | 'submit';
	theme?: ThemeColor;
	variant?: DataGridVariant;
};

export const gridSearchDefaults: Partial<DataGridSearchProps> = {
	focused: true,
	strategy: 'input',
	variant: 'outlined'
};
