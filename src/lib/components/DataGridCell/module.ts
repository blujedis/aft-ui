import type { ThemeColor, ThemeSize } from '$lib/types';
import type { DataGridDataItem } from '../DataGrid/module';

export type DataGridCellProps<D = DataGridDataItem> = {
	accessor?: Extract<keyof D, string>;
	full?: boolean;
	size?: ThemeSize;
	stacked?: boolean;
	theme?: ThemeColor;
};

export const gridCellDefaults: Partial<DataGridCellProps> = {};
