import type { ThemeColor, ThemeFocused, ThemeSize } from '../../types';
import type { DataGridColumnConfig } from '../DataGrid/module';
export type DataGridFilterCellProps = {
    column?: DataGridColumnConfig;
    focused?: ThemeFocused;
    size?: ThemeSize;
    stacked?: boolean;
    theme?: ThemeColor;
};
export declare const filterPopoverDefaults: {
    criteriaOne: string;
    valueOne: string;
    criteriaTwo: string;
    valueTwo: string;
    join: "and" | "or";
};
export declare const gridFilterCellDefaults: Partial<DataGridFilterCellProps>;
