import type { ThemeColor, ThemeSize } from '$lib/types';
import type { cardContent } from './config';

export type CardContentVariant = keyof typeof cardContent;

export type CardContentProps = {
	type?: 'content' | 'header' | 'footer';
	size?: ThemeSize;
	theme?: ThemeColor;
	variant?: CardContentVariant;
	wide?: boolean;
};

export const cardContentDefaults: Partial<CardContentProps> = {
	type: 'content',
	size: 'md',
	theme: 'default',
	variant: 'default'
};
