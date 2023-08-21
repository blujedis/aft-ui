import type { SelectStoreValue } from '$lib/stores/select';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure/module';

export type AccordionOptionContext = {
	key: SelectStoreValue; // must be unique name for all accordions on page.
};

export type AccordianOptionProps<Tag = any> = {
	as?: Tag;
	unflip?: boolean;
	key: SelectStoreValue;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
};

export const accordionOptionDefaults: Partial<AccordianOptionProps<'div'>> = {
	as: 'div',
	size: 'md',
	theme: 'default',
	transition: 'expand'
};
