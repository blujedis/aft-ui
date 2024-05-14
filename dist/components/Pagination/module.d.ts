/// <reference types="svelte" />
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { PaginatorOptions, Paginator } from '../../hooks/usePaginator';
import type { Writable } from 'svelte/store';
export type PaginationContext<T extends Record<string, any> = Record<string, any>> = Writable<Paginator<T>> & {
    globals: {
        focused: boolean;
        hovered: boolean;
        rounded: ThemeRounded;
        size: ThemeSize;
        theme: ThemeColor;
        transitioned: boolean;
        variant: PaginationVariant;
    };
};
export type PaginationVariant = 'filled' | 'flushed' | 'soft';
export interface PaginationProps<T extends Record<string, any> = Record<string, any>> extends PaginatorOptions<T> {
    ellipsis?: boolean;
    focused?: boolean;
    hovered?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: PaginationVariant;
}
export declare const paginationDefaults: Partial<PaginationProps>;
