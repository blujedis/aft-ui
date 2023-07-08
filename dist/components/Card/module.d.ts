import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../theme';
import type { card } from './config';
export type CardVariant = keyof typeof card;
export type CardContext = {
	globals: {
		size?: ThemeSize;
		theme?: ThemeColor;
		wide?: boolean;
	};
};
export type CardProps = {
	edged?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	variant?: CardVariant;
	wide?: boolean;
};
export declare const cardDefaults: Partial<CardProps>;
