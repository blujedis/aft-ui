import type { ThemeColor, ThemeFocused, ThemeSize } from '../../types';
export type DataGridSearchProps = {
    action?: string;
    focused?: ThemeFocused;
    method?: string;
    rounded?: ThemeSize;
    size?: ThemeSize;
    stacked?: boolean;
    strategy?: 'input' | 'submit';
    theme?: ThemeColor;
};
export declare const gridSearchDefaults: Partial<DataGridSearchProps>;
