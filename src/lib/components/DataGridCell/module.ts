import type { ThemeColor, ThemeSize } from '$lib/types';
import type { DataGridDataItem, DataGridVariant } from '../DataGrid/module';

export type DataGridCellProps<D = DataGridDataItem> = {
	accessor?: Extract<keyof D, string>;
	full?: boolean;
	size?: ThemeSize;
	stacked?: boolean;
	theme?: ThemeColor;
	variant?: DataGridVariant;
};

export const gridCellDefaults: Partial<DataGridCellProps> = {};
