import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type PaginationDetailVariant = 'filled' | 'flushed' | 'soft';

export type PaginationDetailProps = {
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: PaginationDetailVariant;
	unstyled?: boolean;
};

export const paginationDetailDefaults: Partial<PaginationDetailProps> = {
	rounded: 'full',
	size: 'md',
	theme: 'frame',
	variant: 'filled'
};
