import type { DataGridDataItem } from '../DataGrid/module';
import type { DataGridCellProps } from '../DataGridCell';

export type DataGridHeaderCellProps<D = DataGridDataItem> = DataGridCellProps & {
	accessor: keyof D;
};

export const gridHeaderCellDefaults: Partial<DataGridHeaderCellProps> = {};
