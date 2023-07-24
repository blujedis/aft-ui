import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { kbd } from './config';

export type KbdVariant = keyof typeof kbd;

export type KbdProps = {
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: KbdVariant;
	unstyled?: boolean;
};

export const kbdDefaults: Partial<KbdProps> = {
	rounded: 'full',
	size: 'md',
	theme: 'default',
	variant: 'default'
};
