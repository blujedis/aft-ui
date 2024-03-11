import type { ThemeColor, ThemeSize, TypeOrValue } from '$lib/types';
import type { DataGridDataItem } from '../DataGrid/module';

export type DataGridCellProps<D = DataGridDataItem> = {
	accessor?: Extract<TypeOrValue<keyof D>, string>;
	full?: boolean;
	size?: ThemeSize;
	stacked?: boolean;
	theme?: ThemeColor;
};

export const gridCellDefaults: Partial<DataGridCellProps> = {};
