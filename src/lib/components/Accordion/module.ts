import type { SelectStore, SelectValue } from '$lib/stores/select';
import type { accordion } from './config';
import type { AccordianOptionProps } from '../AccordionOption';
import type { HTMLTag } from '../types';
import { accordionOptionDefaults } from '../AccordionOption';
import type { ThemeRounded, ThemeShadowed } from '$lib/theme';

export type AccordianVariant = keyof typeof accordion;

export type AccordionContext = SelectStore & {
	globals: Omit<AccordianOptionProps, 'as'> & { rounded: ThemeRounded };
};

export type AccordionProps<Tag extends HTMLTag> = Omit<
	AccordianOptionProps,
	'as' | 'value' | 'variant'
> & {
	as?: Tag;
	full?: boolean;
	multiple?: boolean;
	selected?: SelectValue[];
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	variant?: AccordianVariant;
};

const { variant, ...rest } = accordionOptionDefaults;

export const accordionDefaults: AccordionProps<'div'> = {
	...rest,
	as: 'div',
	multiple: false,
	selected: [],
	theme: 'default',
	variant: 'default'
};
