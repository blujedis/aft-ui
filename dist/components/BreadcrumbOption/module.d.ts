import type { ThemeColor, ThemeSize, ThemeTransitioned } from '../../theme';
import type { IconifyIcon } from '@iconify/svelte';
import type { breadcrumbOption } from './config';
export type BreadcrumbOptionVariant = keyof typeof breadcrumbOption;
export type BreadcrumbOptionProps = {
	label?: string;
	href?: string;
	index?: number;
	icon?: string | IconifyIcon;
	sronly?: string;
	selected?: boolean;
	separator?: string | IconifyIcon;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: BreadcrumbOptionVariant;
};
export declare const breadcrumbOptionDefaults: Partial<BreadcrumbOptionProps>;
