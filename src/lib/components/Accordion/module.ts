import type { SelectStore, SelectStoreValue } from '$lib/stores/select';
import type { accordion } from './config';
import type { AccordianOptionProps } from '../AccordionOption';
import type { HTMLTag, ThemeRounded, ThemeShadowed } from '../../types';
import { accordionOptionDefaults } from '../AccordionOption';

export type AccordianVariant = keyof typeof accordion;

export type AccordionContext = SelectStore & {
	globals: Omit<AccordianOptionProps, 'as'> & { rounded: ThemeRounded; variant: AccordianVariant };
};

export type AccordionProps<Tag extends HTMLTag> = Omit<
	AccordianOptionProps,
	'as' | 'value' | 'variant'
> & {
	as?: Tag;
	multiple?: boolean;
	selected?: SelectStoreValue[];
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	variant?: AccordianVariant;
};

export const accordionDefaults: AccordionProps<'div'> = {
	...accordionOptionDefaults,
	as: 'div',
	multiple: false,
	selected: [],
	theme: 'light',
	variant: 'outlined'
};
