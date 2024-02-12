import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
} from '$lib/types';

export type TileVariant = 'filled' | 'outlined' | 'soft';  

export type TileProps = {
	focused?: boolean;
	full?: boolean;
	hovered?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: TileVariant;
};

export const tileDefaults: Partial<TileProps> = {
	rounded: 'md',
	size: 'md',
	theme: 'frame',
	variant: 'filled'
};
