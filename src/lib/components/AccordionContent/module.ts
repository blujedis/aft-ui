import type { SelectStoreValue } from '$lib/stores/select';
import type { HTMLTag, ThemeColor, ThemeSize } from '../../types';
import type { AccordionVariant } from '../AccordionButton/module';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';

export type AccordionContentProps<Tag extends HTMLTag> = {
	as?: Tag;
	key?: SelectStoreValue;
	size?: ThemeSize;
	theme?: ThemeColor;
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
	variant?: AccordionVariant;
};

export const accordionContentDefaults: Partial<AccordionContentProps<'div'>> = {
	as: 'div',
	size: 'md',
	transition: 'expand'
};
