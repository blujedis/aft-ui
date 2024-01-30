import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { empty } from './config';
export type EmptyVariant = keyof typeof empty;
export type EmptyProps = {
    as?: 'button' | 'link' | 'div' | 'span' | 'label';
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: EmptyVariant;
    unstyled?: boolean;
};
export declare const emptyDefaults: Partial<EmptyProps>;
