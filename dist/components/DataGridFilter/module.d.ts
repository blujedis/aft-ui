import type { ThemeColor, ThemeFocused, ThemeSize } from '../../types';
import type { DataGridColumnConfig, DataGridVariant } from '../DataGrid/module';
export type DataGridFilterProps = {
    autocols?: boolean;
    columns?: DataGridColumnConfig[];
    focused?: ThemeFocused;
    size?: ThemeSize;
    theme?: ThemeColor;
    variant?: DataGridVariant;
};
export declare const gridFilterDefaults: Partial<DataGridFilterProps>;
