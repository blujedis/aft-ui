import type { ThemeObjectFit, ThemeObjectPosition, ThemeRounded, ThemeShadowed, ElementProps } from '../../types';
import type { LazyImageOptions } from '../../utils/lazyImage';
export type ImageProps = ElementProps<'img'> & {
    fit?: ThemeObjectFit;
    full?: boolean | 'w' | 'h' | 'width' | 'height';
    lazyload?: boolean | LazyImageOptions;
    position?: ThemeObjectPosition;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
};
export declare const imageDefaults: Partial<ImageProps>;
