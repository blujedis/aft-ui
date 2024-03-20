import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type InputVariant = 'outlined' | 'filled' | 'flushed' | 'soft' | 'text';
export type InputProps = {
    disabled?: boolean;
    focused?: boolean;
    full?: boolean;
    hovered?: boolean;
    chars?: number;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: InputVariant;
};
export declare const inputDefaults: Partial<InputProps>;
