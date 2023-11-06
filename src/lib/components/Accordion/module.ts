import type { SelectStore, SelectStoreValue } from '$lib/stores/select';
import type { AccordianOptionProps } from '../AccordionOption';
import type { HTMLTag, ThemeRounded, ThemeShadowed } from '../../types';
import { accordionOptionDefaults } from '../AccordionOption';
import type { AccordionVariant } from '../AccordionButton/module';

export type AccordionContext = SelectStore & {
	globals: Omit<AccordianOptionProps, 'as'> & { rounded: ThemeRounded; variant: AccordionVariant };
};

export type AccordionProps<Tag extends HTMLTag> = Omit<
	AccordianOptionProps,
	'as' | 'value' | 'variant' | 'key'
> & {
	as?: Tag;
	multiple?: boolean;
	selected?: SelectStoreValue[];
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	variant?: AccordionVariant;
};

export const accordionDefaults: Partial<AccordionProps<'div'>> = {
	...accordionOptionDefaults,
	as: 'div',
	multiple: false,
	selected: [],
	theme: 'default',
	variant: 'outlined'
};
