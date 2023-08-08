import type { ThemeColor, ThemeSize } from '../../types';
import type { DataGridDataItem, DataGridVariant } from '../DataGrid/module';
export type DataGridCellProps<D = DataGridDataItem> = {
    accessor?: Extract<keyof D, string>;
    size?: ThemeSize;
    stacked?: boolean;
    theme?: ThemeColor;
    variant?: DataGridVariant;
};
export declare const gridCellDefaults: Partial<DataGridCellProps>;
