import type { SelectStoreValue } from '$lib/stores/select';
import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeSize } from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';

export type PaginationPageVariant = 'filled' | 'flushed' | 'soft';

export type PaginationPageProps<Tag> = {
	as?: Tag;
	disabled?: boolean;
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

export const paginationPageDefaults: Partial<PaginationPageProps<'button'>> = {
	as: 'button',
	focused: true,
	size: 'md',
	theme: 'frame',
	variant: 'flushed'
};
