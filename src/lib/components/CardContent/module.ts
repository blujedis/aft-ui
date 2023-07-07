import type { ThemeColor, ThemeSize } from '$lib/theme';
import type { cardContent } from './config';

export type CardContentVariant = keyof typeof cardContent;

export type CardContentProps = {
	mode?: 'content' | 'header' | 'footer';
	size?: ThemeSize;
	theme?: ThemeColor;
	variant?: CardContentVariant;
	wide?: boolean;
};

export const cardContentDefaults: Partial<CardContentProps> = {
	mode: 'content',
	size: 'md',
	theme: 'default',
	variant: 'default'
};
