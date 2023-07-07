import type { SelectValue } from '$lib/stores/select';
import type { ThemeColor, ThemeSize } from '$lib/theme';
import type { SlideParams } from 'svelte/transition';
import type { accordionOption } from './config';

export type AccordianOptionVariant = keyof typeof accordionOption;

export type AccordianOptionProps<Tag = any> = Omit<SlideParams, 'axis'> & {
	as?: Tag;
	name?: SelectValue;
	size?: ThemeSize;
	theme?: ThemeColor;
	variant?: AccordianOptionVariant;
};

export const accordionOptionDefaults: Partial<AccordianOptionProps<'div'>> = {
	as: 'div',
	duration: 200, // set to 0 to disable.
	size: 'md',
	theme: 'default',
	variant: 'default'
};
