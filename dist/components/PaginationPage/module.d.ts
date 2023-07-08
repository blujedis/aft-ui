import type { SelectValue } from '../../stores/select';
import type { ThemeColor, ThemeRounded, ThemeSize, ThemeTransitioned } from '../../theme';
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
export declare const paginationPageDefaults: Partial<PaginationPageProps<'a'>>;
