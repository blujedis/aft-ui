import type { ThemeColor, ThemeFocused, ThemeSize } from '../../types';
import type { DataGridVariant } from '../DataGrid/module';
export type DataGridSearchProps = {
    action?: string;
    focused?: ThemeFocused;
    method?: string;
    size?: ThemeSize;
    strategy?: 'input' | 'enter';
    theme?: ThemeColor;
    variant?: DataGridVariant;
};
export declare const gridSearchDefaults: Partial<DataGridSearchProps>;
