import type { ThemeObjectFit, ThemeObjectPosition, ThemeRounded, ThemeShadowed } from '$lib/types';

export type ImageProps = {
	fit?: ThemeObjectFit;
	full?: boolean | 'w' | 'h' | 'width' | 'height';
	position?: ThemeObjectPosition;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
};

export const imageDefaults: Partial<ImageProps> = {};
