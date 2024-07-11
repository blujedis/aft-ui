import type { ThemeColor, ThemeSize } from '../../types';
import type { DataGridColumnConfig } from '../DataGrid/module';
export type DataGridRowProps = {
    autocols?: boolean;
    columns?: DataGridColumnConfig[];
    divided?: boolean;
    draggable?: boolean;
    size?: ThemeSize;
    stacked?: boolean;
    striped?: boolean;
    theme?: ThemeColor;
};
export declare const gridRowDefaults: Partial<DataGridRowProps>;
