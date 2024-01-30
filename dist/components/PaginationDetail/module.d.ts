import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { paginationDetail } from './config';
export type PaginationDetailVariant = keyof typeof paginationDetail;
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
