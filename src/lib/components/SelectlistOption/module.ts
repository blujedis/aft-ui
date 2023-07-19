import type { ThemeColor, ThemeSize } from '$lib/types';
import type { MultiselectItemKey } from '../MultiselectController';
import type { multiselectOption } from './config';

export type MultiselectOptionVariant = keyof typeof multiselectOption;

export type MultiselectOptionProps<Tag extends 'a' | 'button'> = {
	as?: Tag;
	size?: ThemeSize;
	theme?: ThemeColor;
	key?: MultiselectItemKey;
	variant?: MultiselectOptionVariant;
};

export const multiselectOptionDefaults: MultiselectOptionProps<'a'> = {
	as: 'a',
	size: 'sm',
	theme: 'default',
	variant: 'default'
};
