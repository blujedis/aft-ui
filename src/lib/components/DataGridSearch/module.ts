import type { ThemeColor, ThemeFocused, ThemeSize } from '$lib/types';
import type { DataGridVariant } from '../DataGrid/module';

export type DataGridSearchProps = {
	action?: string;
	focused?: ThemeFocused;
	method?: string;
	size?: ThemeSize;
	strategy?: 'input' | 'enter';
	theme?: ThemeColor;
	variant?: DataGridVariant;
};

export const gridSearchDefaults: Partial<DataGridSearchProps> = {
	focused: true,
	strategy: 'input',
	variant: 'outlined'
};
