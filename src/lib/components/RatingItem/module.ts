import type { ThemeColorKey, ThemeSize } from '$lib/types';

export type RatingItemProps = {
	background?: string; // transparent will show container page bg or set to white etc.
	fill?: ThemeColorKey;
	index: number;
	size?: ThemeSize;
	stroked?: boolean; // if true use fill for stroke color.
};

export const ratingDefaults: Partial<RatingItemProps> = {
	background: 'transparent',
	fill: '#FFA41C',
	size: 'sm',
	stroked: true
};
