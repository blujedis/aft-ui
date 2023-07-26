import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { PaginatorOptions, PaginatorStore } from '$lib/stores/paginator';
import type { paginationPage } from '../PaginationPage/config';

export type PaginationContext<T extends Record<string, any> = Record<string, any>> =
	PaginatorStore<T> & {
		globals: {
			rounded?: ThemeRounded;
			shadowed?: ThemeShadowed;
			size?: ThemeSize;
			theme?: ThemeColor;
			transitioned?: ThemeTransitioned;
			variant?: PaginationVariant;
		};
	};

export type PaginationVariant = keyof typeof paginationPage;

export interface PaginationProps<T extends Record<string, any> = Record<string, any>>
	extends PaginatorOptions<T> {
	ellipsis?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: PaginationVariant;
}

export const paginationDefaults: Partial<PaginationProps> = {
	rounded: 'full',
	size: 'md',
	theme: 'frame',
	variant: 'flushed'
};
