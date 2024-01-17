import type { ThemeColor, ThemeFocused, ThemeSize, ThemeTransitioned } from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
import type { breadcrumbOption } from './config';
export type BreadcrumbVariant = keyof typeof breadcrumbOption;
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
    transitioned?: ThemeTransitioned;
    variant?: BreadcrumbVariant;
};
export declare const breadcrumbOptionDefaults: Partial<BreadcrumbOptionProps>;
