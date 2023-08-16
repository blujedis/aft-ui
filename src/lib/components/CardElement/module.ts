import type { ThemeColor, ThemeSize, ThemeVariant } from '$lib/types';
// import type { cardElement } from './config';

export type CardElementVariant = Exclude<ThemeVariant, 'text' | 'flushed'>; // keyof typeof cardElement;

export type CardElementProps = {
	horizontal?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	type?: 'content' | 'header' | 'footer';
	variant?: CardElementVariant;
};

export const cardElementDefaults: Partial<CardElementProps> = {
	type: 'content',
	size: 'md',
	theme: 'default'
};
