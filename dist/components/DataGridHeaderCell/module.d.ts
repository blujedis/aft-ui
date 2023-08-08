import type { DataGridDataItem } from '../DataGrid/module';
import type { DataGridCellProps } from '../DataGridCell';
export type DataGridHeaderCellProps<D = DataGridDataItem> = DataGridCellProps & {
    accessor: keyof D;
};
export declare const gridHeaderCellDefaults: Partial<DataGridHeaderCellProps>;
