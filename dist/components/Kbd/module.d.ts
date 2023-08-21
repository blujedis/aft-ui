import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned, ThemeVariant } from '../../types';
export type KbdVariant = Exclude<ThemeVariant, 'flushed' | 'text'>;
export type KbdProps = {
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: ThemeTransitioned;
    variant?: KbdVariant;
    unstyled?: boolean;
};
export declare const kbdDefaults: Partial<KbdProps>;
