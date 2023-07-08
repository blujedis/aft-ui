import type { ThemeColor, ThemeSize } from '../../theme';
import type { cardContent } from './config';
export type CardContentVariant = keyof typeof cardContent;
export type CardContentProps = {
	mode?: 'content' | 'header' | 'footer';
	size?: ThemeSize;
	theme?: ThemeColor;
	variant?: CardContentVariant;
	wide?: boolean;
};
export declare const cardContentDefaults: Partial<CardContentProps>;
