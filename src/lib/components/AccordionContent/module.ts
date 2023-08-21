import type { SelectStoreValue } from '$lib/stores/select';
import type { HTMLTag, ThemeColor, ThemeSize, ThemeVariant } from '../../types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';

export type AccordionContentVariant = Exclude<ThemeVariant, 'text' | 'ghost'>;

export type AccordionContentProps<Tag extends HTMLTag> = {
	as?: Tag;
	key?: SelectStoreValue;
	size?: ThemeSize;
	theme?: ThemeColor;
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
	variant?: AccordionContentVariant;
};

export const accordionContentDefaults: Partial<AccordionContentProps<'div'>> = {
	as: 'div',
	size: 'md',
	transition: 'expand'
};
