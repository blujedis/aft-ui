import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
	ThemeVariant
} from '$lib/types';
// import type { kbd } from './config';

export type KbdVariant = Exclude<ThemeVariant, 'flushed' | 'text'>; // keyof typeof kbd;

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
	variant: 'filled'
};
