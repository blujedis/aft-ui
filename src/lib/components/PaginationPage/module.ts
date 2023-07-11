import type { SelectValue } from '$lib/stores/select';
import type { ThemeColor, ThemeRounded, ThemeSize, ThemeTransitioned } from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
import type { paginationPage } from './config';

export type PaginationPageVariant = keyof typeof paginationPage;

export type PaginationPageProps<Tag> = {
	as: Tag;
	next?: boolean | string | IconifyIcon;
	previous?: boolean | string | IconifyIcon;
	rounded?: ThemeRounded;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	value?: SelectValue;
	variant?: PaginationPageVariant;
};

export const paginationPageDefaults: Partial<PaginationPageProps<'a'>> = {
	rounded: 'full',
	size: 'md',
	theme: 'default',
	variant: 'flushed'
};
