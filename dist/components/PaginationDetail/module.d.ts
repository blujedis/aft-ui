import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type PaginationDetailVariant = 'filled' | 'flushed' | 'soft';
export type PaginationDetailProps = {
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: PaginationDetailVariant;
    unstyled?: boolean;
};
export declare const paginationDetailDefaults: Partial<PaginationDetailProps>;
