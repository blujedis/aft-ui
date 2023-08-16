import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
	ThemeVariant
} from '$lib/types';
// import type { tile } from './config';

export type TileVariant = Exclude<ThemeVariant, 'text' | 'flushed'>;

export type TileProps = {
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: TileVariant;
};

export const tileDefaults: Partial<TileProps> = {
	rounded: 'md',
	size: 'md',
	theme: 'default',
	variant: 'filled'
};
