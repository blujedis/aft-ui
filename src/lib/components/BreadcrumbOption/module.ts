import type { ThemeColor, ThemeSize, ThemeTransitioned } from '$lib/theme';
import type { IconifyIcon } from '@iconify/svelte';
import type { breadcrumbOption } from './config';

export type BreadcrumbOptionVariant = keyof typeof breadcrumbOption;

export type BreadcrumbOptionProps = {
	label?: string;
	href?: string;
	index?: number; // only used when generated from Breadcrumb parent.
	icon?: string | IconifyIcon;
	sronly?: string; // when present no label is used.
	selected?: boolean;
	separator?: string | IconifyIcon;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: BreadcrumbOptionVariant;
};

export const breadcrumbOptionDefaults: Partial<BreadcrumbOptionProps> = {
	size: 'md',
	separator: 'mdi-light:chevron-right',
	theme: 'default',
	variant: 'default'
};
