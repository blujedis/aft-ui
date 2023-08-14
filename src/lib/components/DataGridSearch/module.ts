import type { ThemeColor, ThemeFocused, ThemeSize } from '$lib/types';
import type { DataGridColumnConfig, DataGridVariant } from '../DataGrid/module';

export type DataGridSearchProps = {
	autocols?: boolean;
	columns?: DataGridColumnConfig[];
	focused?: ThemeFocused;
	size?: ThemeSize;
	theme?: ThemeColor;
	variant?: DataGridVariant;
};

export const gridSearchDefaults: Partial<DataGridSearchProps> = {
	autocols: true,
	focused: true,
	variant: 'outlined'
};
