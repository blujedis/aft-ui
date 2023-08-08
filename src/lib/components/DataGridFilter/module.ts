import type { ThemeColor, ThemeFocused, ThemeSize } from '$lib/types';
import type { DataGridColumnConfig, DataGridVariant } from '../DataGrid/module';

export type DataGridFilterProps = {
	autocols?: boolean;
	columns?: DataGridColumnConfig[];
	focused?: ThemeFocused;
	size?: ThemeSize;
	theme?: ThemeColor;
	variant?: DataGridVariant;
};

export const gridFilterDefaults: Partial<DataGridFilterProps> = {
	autocols: true,
	focused: true,
	variant: 'outlined'
};
