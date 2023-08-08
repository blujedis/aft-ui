import type { SelectStoreValue } from '$lib/stores/select';
import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeSize,
	ThemeTransitioned
} from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
import type { paginationPage } from './config';

export type PaginationPageVariant = keyof typeof paginationPage;

export type PaginationPageProps<Tag> = {
	as: Tag;
	focused?: ThemeFocused;
	next?: boolean | string | IconifyIcon;
	previous?: boolean | string | IconifyIcon;
	rounded?: ThemeRounded;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	value?: SelectStoreValue;
	variant?: PaginationPageVariant;
};

export const paginationPageDefaults: Partial<PaginationPageProps<'a'>> = {
	focused: true,
	rounded: 'full',
	size: 'md',
	theme: 'light',
	variant: 'flushed'
};
