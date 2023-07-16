import type { SelectValue } from '$lib/stores/select';
import type { ThemeColor, ThemeSize } from '$lib/types';
import type { accordionOption } from './config';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure/module';

export type AccordianOptionVariant = keyof typeof accordionOption;

export type AccordianOptionProps<Tag = any> = {
	as?: Tag;
	key?: SelectValue;
	size?: ThemeSize;
	theme?: ThemeColor;
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
	variant?: AccordianOptionVariant;
};

export const accordionOptionDefaults: Partial<AccordianOptionProps<'div'>> = {
	as: 'div',
	size: 'md',
	theme: 'default',
	transition: 'expand',
	variant: 'default'
};
