import type { ThemeSize } from '../../types';
export type SelectOptionVariant = 'outlined';
export type SelectOptionProps = {
    disabled?: boolean;
    full?: boolean;
    size?: ThemeSize;
    value: string | number;
};
export declare const selectOptionDefaults: Partial<SelectOptionProps>;
