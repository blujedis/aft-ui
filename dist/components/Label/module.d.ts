import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { label } from './config';
export type LabelVariant = keyof typeof label;
export type LabelProps = {
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    dropshadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: LabelVariant;
    unstyled?: boolean;
};
export declare const labelDefaults: Partial<LabelProps>;
