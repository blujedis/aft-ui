import type {
	ThemeColor,
	ThemeFocused,
	ThemeSize,
	ThemeTransitioned,
	ThemeVariant
} from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
import type { breadcrumbOption } from './config';
import type { globals } from '../configs';

export type BreadcrumbVariant = keyof typeof breadcrumbOption;

export type BreadcrumbOptionProps = {
	label?: string;
	focused?: ThemeFocused;
	href?: string;
	index?: number; // only used when generated from Breadcrumb parent.
	icon?: string | IconifyIcon;
	sronly?: string; // when present no label is used.
	selected?: boolean;
	separator?: string | IconifyIcon;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: BreadcrumbVariant;
};

export const breadcrumbOptionDefaults: Partial<BreadcrumbOptionProps> = {
	focused: true,
	size: 'md',
	separator: 'mdi-light:chevron-right',
	theme: 'default',
	variant: 'text'
};

export const variantMap = {
	text: 'textHover',
	ghost: 'textHover',
	glass: 'textHover',
	filled: 'textHover'
} as Record<Exclude<ThemeVariant, 'flushed' | 'outlined'>, keyof typeof globals>;
