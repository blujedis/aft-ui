import type { SelectStore, SelectStoreValue } from '$lib/stores/select';
import type { AccordianOptionProps } from '../AccordionOption';
import type { HTMLTag, ThemeRounded, ThemeShadowed, ThemeVariant } from '../../types';
import { accordionOptionDefaults } from '../AccordionOption';

export type AccordianVariant = Exclude<ThemeVariant, 'text' | 'ghost'>;

export type AccordionContext = SelectStore & {
	globals: Omit<AccordianOptionProps, 'as'> & { rounded: ThemeRounded; variant: AccordianVariant };
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
	variant?: AccordianVariant;
};

export const accordionDefaults: Partial<AccordionProps<'div'>> = {
	...accordionOptionDefaults,
	as: 'div',
	multiple: false,
	selected: [],
	theme: 'default',
	variant: 'outlined'
};
