import type { SelectStore, SelectValue } from '$lib/stores/select';
import type { accordion } from './config';
import type { AccordianOptionProps } from '../AccordionOption';
import type { HTMLTag, ThemeRounded, ThemeShadowed } from '../../types';
import { accordionOptionDefaults } from '../AccordionOption';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { variant, ...rest } = accordionOptionDefaults;

export const accordionDefaults: AccordionProps<'div'> = {
	...rest,
	as: 'div',
	multiple: false,
	selected: [],
	theme: 'default',
	variant: 'default'
};
