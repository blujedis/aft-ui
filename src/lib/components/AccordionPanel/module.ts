import type { SelectValue } from '$lib/stores/select';
import type { HTMLTag } from '../../types';

export type AccordionPanelContext = {
	key: SelectValue; // must be unique name for all accordions on page.
};

export type AccordionPanelProps<Tag extends HTMLTag> = {
	as?: Tag;
	key: SelectValue;
};

export const accordionPanelDefaults: Partial<AccordionPanelProps<'div'>> = {
	as: 'div'
};
