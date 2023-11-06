import type { ThemeColor, ThemeSize } from '$lib/types';
import type { cardElement } from './config';

export type CardVariant = keyof typeof cardElement;

export type CardElementProps = {
	horizontal?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	type?: 'content' | 'header' | 'footer';
	variant?: CardVariant;
};

export const cardElementDefaults: Partial<CardElementProps> = {
	type: 'content',
	size: 'md',
	theme: 'default'
};
