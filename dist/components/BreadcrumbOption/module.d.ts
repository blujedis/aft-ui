import type { ThemeColor, ThemeFocused, ThemeSize } from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
export type BreadcrumbVariant = 'filled' | 'soft' | 'text';
export type BreadcrumbOptionProps = {
    label?: string;
    focused?: ThemeFocused;
    href?: string;
    index?: number;
    icon?: string | IconifyIcon;
    sronly?: string;
    selected?: boolean;
    separator?: string | IconifyIcon;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: BreadcrumbVariant;
};
export declare const breadcrumbOptionDefaults: Partial<BreadcrumbOptionProps>;
