import type { ThemeColor, ThemeSize } from '../../types';
import type { DataGridColumnConfig, DataGridVariant } from '../DataGrid/module';
export type DataGridRowProps = {
    autocols?: boolean;
    columns?: DataGridColumnConfig[];
    divided?: boolean;
    size?: ThemeSize;
    stacked?: boolean;
    striped?: boolean;
    theme?: ThemeColor;
    variant?: DataGridVariant;
};
export declare const gridRowDefaults: Partial<DataGridRowProps>;
