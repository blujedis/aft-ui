/**
 * Global Options
 * dropshadow: (light: none)
 */
import type { SvelteComponent } from 'svelte';
import type { floatingElement } from './config';
import type {  ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';

export type FloatingElementVariant = keyof typeof floatingElement;

export type FloatingElementProps = {
	arrowed?: boolean;
	content?: string | typeof SvelteComponent<any> | null;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	unstyled?: boolean;
	variant?: FloatingElementVariant;
};

export const floatingElementDefaults: FloatingElementProps = {
	arrowed: true,
	shadowed: 'md',
	size: 'md',
	theme: 'light',
	variant: 'filled'
};
