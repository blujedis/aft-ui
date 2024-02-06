import type { ThemeObjectFit, ThemeObjectPosition, ThemeRounded, ThemeShadowed, ElementProps } from '$lib/types';
import type { LazyImageOptions } from '$lib/utils/lazyImage';

export type ImageProps = ElementProps<'img'> & {
	fit?: ThemeObjectFit;
	full?: boolean | 'w' | 'h' | 'width' | 'height';
	lazyload?: boolean | LazyImageOptions;
	position?: ThemeObjectPosition;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
};

export const imageDefaults: Partial<ImageProps> = {};
