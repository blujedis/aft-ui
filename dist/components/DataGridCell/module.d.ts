import type { ThemeColor, ThemeSize, TypeOrValue } from '../../types';
import type { DataGridDataItem } from '../DataGrid/module';
export type DataGridCellProps<D = DataGridDataItem> = {
    accessor?: Extract<TypeOrValue<keyof D>, string>;
    full?: boolean;
    size?: ThemeSize;
    stacked?: boolean;
    theme?: ThemeColor;
};
export declare const gridCellDefaults: Partial<DataGridCellProps>;
