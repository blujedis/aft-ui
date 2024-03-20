import type { SelectStoreValue } from '../../stores/select';
import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeSize } from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
export type PaginationPageVariant = 'filled' | 'flushed' | 'soft';
export type PaginationPageProps<Tag> = {
    as?: Tag;
    focused?: ThemeFocused;
    hovered?: boolean;
    next?: boolean | string | IconifyIcon;
    previous?: boolean | string | IconifyIcon;
    rounded?: ThemeRounded;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    value?: SelectStoreValue;
    variant?: PaginationPageVariant;
};
export declare const paginationPageDefaults: Partial<PaginationPageProps<'button'>>;
