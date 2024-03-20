import type { SelectStore, SelectStoreValue } from '$lib/stores/select';
import type { AccordianOptionProps } from '../AccordionOption';
import type { HTMLTag, ThemeRounded, ThemeShadowed } from '$lib/types';
import { accordionOptionDefaults } from '../AccordionOption';
import type { AccordionVariant } from '../AccordionButton/module';

export type AccordionContext = SelectStore & {
	globals: Omit<AccordianOptionProps, 'as' | 'selected' | 'key'> & {
		hovered: boolean;
		selectable: boolean;
		transitioned: boolean;
		key?: any;
	};
};

export type AccordionProps<Tag extends HTMLTag> = Omit<
	AccordianOptionProps,
	'as' | 'value' | 'variant' | 'key' | 'selected'
> & {
	as?: Tag;
	focused?: boolean;
	hovered?: boolean;
	multiple?: boolean;
	selected?: SelectStoreValue[];
	selectable?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	transitioned?: boolean;
	variant?: AccordionVariant;
};

export const accordionDefaults: Partial<AccordionProps<'div'>> = {
	...accordionOptionDefaults,
	as: 'div',
	multiple: false,
	selected: []
	// theme: 'frame',
	// variant: 'filled'
};
