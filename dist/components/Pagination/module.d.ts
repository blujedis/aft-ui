import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { PaginatorOptions, PaginatorStore } from '../../stores/paginator';
import type { paginationPage } from '../PaginationPage/config';
export type PaginationContext<T extends Record<string, any> = Record<string, any>> = PaginatorStore<T> & {
    globals: {
        rounded?: ThemeRounded;
        shadowed?: ThemeShadowed;
        size?: ThemeSize;
        theme?: ThemeColor;
        transitioned?: boolean;
        variant?: PaginationVariant;
    };
};
export type PaginationVariant = keyof typeof paginationPage;
export interface PaginationProps<T extends Record<string, any> = Record<string, any>> extends PaginatorOptions<T> {
    ellipsis?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: PaginationVariant;
}
export declare const paginationDefaults: Partial<PaginationProps>;
