import type { SelectStoreValue } from '$lib/stores/select';
import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';
import type { paginationPage } from './config';

export type PaginationPageVariant = keyof typeof paginationPage;

export type PaginationPageProps<Tag> = {
	as?: Tag;
	focused?: ThemeFocused;
	next?: boolean | string | IconifyIcon;
	previous?: boolean | string | IconifyIcon;
	rounded?: ThemeRounded;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	value?: SelectStoreValue;
	variant?: PaginationPageVariant;
};

export const paginationPageDefaults: Partial<PaginationPageProps<'button'>> = {
	as: 'button',
	focused: true,
	size: 'md',
	theme: 'default',
	variant: 'flushed'
};
