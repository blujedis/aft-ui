import type { ThemeSize } from '$lib/types';

export type RatingItemProps = {
	background?: string; // transparent will show container page bg or set to white etc.
	fill?: string;
	index: number;
	size?: ThemeSize;
	stroked?: boolean; // if true use fill for stroke color.
};

export const ratingDefaults: Partial<RatingItemProps> = {
	background: 'transparent',
	fill: '#FFA41C', // hex, rgb, hsl or known variable.
	size: 'sm',
	stroked: true
};
