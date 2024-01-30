import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { kbd } from './config';
export type KbdVariant = keyof typeof kbd;
export type KbdProps = {
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: KbdVariant;
    unstyled?: boolean;
};
export declare const kbdDefaults: Partial<KbdProps>;
