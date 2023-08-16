import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

import type { CardElementVariant } from '../CardElement';

export type CardContext = {
	globals: {
		size?: ThemeSize;
		theme?: ThemeColor;
		horizontal?: boolean;
		variant?: CardElementVariant;
	};
};

export type CardProps = {
	divided?: boolean;
	full?: boolean;
	horizontal?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	variant?: CardElementVariant;
	maxwidth?: ThemeSize;
};

export const cardDefaults: Partial<CardProps> = {
	size: 'md',
	theme: 'default'
};
