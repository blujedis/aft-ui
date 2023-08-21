import type { ThemeColor, ThemeSize, ThemeTransitioned } from '../../types';
export type SelectOptionVariant = 'outlined';
export type SelectOptionProps = {
    disabled?: boolean;
    full?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: ThemeTransitioned;
    value: string | number;
    variant?: SelectOptionVariant;
    unstyled?: boolean;
};
export declare const selectOptionDefaults: Partial<SelectOptionProps>;
