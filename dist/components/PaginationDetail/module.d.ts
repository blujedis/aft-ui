import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned } from '../../theme';
import type { paginationDetail } from './config';
export type PaginationDetailVariant = keyof typeof paginationDetail;
export type PaginationDetailProps = {
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: ThemeTransitioned;
    variant?: PaginationDetailVariant;
    unstyled?: boolean;
};
export declare const paginationDetailDefaults: Partial<PaginationDetailProps>;
