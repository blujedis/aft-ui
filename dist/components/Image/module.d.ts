import type { ThemeObjectFit, ThemeObjectPosition, ThemeRounded, ThemeShadowed } from '../../types';
export type ImageProps = {
    fit?: ThemeObjectFit;
    full?: boolean | 'w' | 'h' | 'width' | 'height';
    position?: ThemeObjectPosition;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
};
export declare const imageDefaults: Partial<ImageProps>;
