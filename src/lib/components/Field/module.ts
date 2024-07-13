import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
// import type Icon from '@iconify/svelte';
// export const fallbackIcon = 'mdi:circle-medium';
// icon?: string | boolean | Icon;
// iconon?: 'left' | 'right';
// 	close?: (e: Event) => any;

export type FieldVariant = 'text' | 'soft';

export type FieldProps = {
	full?: boolean;
	focused?: boolean;
	ringed?: boolean | string;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: FieldVariant;
};

export const fieldDefaults: Partial<FieldProps> = {
	size: 'md',
	theme: 'frame',
	variant: 'text'
};
