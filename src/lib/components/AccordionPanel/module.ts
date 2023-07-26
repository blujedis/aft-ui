import type { SelectStoreValue } from '$lib/stores/select';
import type { HTMLTag } from '../../types';

export type AccordionPanelContext = {
	key: SelectStoreValue; // must be unique name for all accordions on page.
};

export type AccordionPanelProps<Tag extends HTMLTag> = {
	as?: Tag;
	key: SelectStoreValue;
};

export const accordionPanelDefaults: Partial<AccordionPanelProps<'div'>> = {
	as: 'div'
};
