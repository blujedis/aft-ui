import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type FieldVariant = 'text' | 'soft';
export type FieldProps = {
    full?: boolean;
    focused?: boolean;
    ringed?: boolean | string;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: FieldVariant;
};
export declare const fieldDefaults: Partial<FieldProps>;
