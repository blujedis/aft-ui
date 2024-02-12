import { cubicOut } from 'svelte/easing';
import type { ThemeColor, ThemeShadowed, ThemeSize } from '$lib/types';

export type ProgressCircleTweenedOptions<T extends number = any> = {
	delay?: number;
	duration?: number | ((from: T, to: T) => number);
	easing?: (t: number) => number;
	interpolate?: (a: T, b: T) => (t: number) => T;
};

export type ProgressCircleProps<T extends number = any> = ProgressCircleTweenedOptions<T> & {
	animate?: boolean;
	max?: number;
	shadowed?: ThemeShadowed;
	size?: ThemeSize | number;
	text?: boolean | string;
	textunit?: string;
	theme?: ThemeColor;
	tracksize?: ThemeSize | number; // fallback to "size"
	value?: T;
};

export const progressCircleDefaults: ProgressCircleProps<any> = {
	animate: true,
	duration: 400,
	easing: cubicOut,
	max: 100,
	size: 'md',
	text: true,
	textunit: '%',
	theme: 'frame',
	value: 0,
};
