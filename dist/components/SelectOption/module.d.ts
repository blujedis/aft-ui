import type { ThemeColor, ThemeSize } from '../../types';
export type SelectOptionVariant = 'outlined';
export type SelectOptionProps = {
    disabled?: boolean;
    full?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    value: string | number;
    variant?: SelectOptionVariant;
    unstyled?: boolean;
};
export declare const selectOptionDefaults: Partial<SelectOptionProps>;
