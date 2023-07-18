import type { ThemeColor, ThemeSize } from '$lib/types';
import type { multiselectOption } from './config';

export type MultiselectOptionVariant = keyof typeof multiselectOption;

export type MultiselectOptionProps<Tag extends 'a' | 'button'> = {
	as?: Tag;
	label?: string;
	multiple?: boolean;
	selected?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	value?: string | number;
	variant?: MultiselectOptionVariant;
};

export const multiselectOptionDefaults: MultiselectOptionProps<'a'> = {
	as: 'a',
	size: 'sm',
	theme: 'default',
	variant: 'default'
};
