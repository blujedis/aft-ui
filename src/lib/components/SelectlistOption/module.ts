import type { ThemeColor, ThemeSize } from '$lib/types';
import type { SelectListItemKey } from '../SelectList';
import type { selectListOption } from './config';

export type SelectListOptionVariant = keyof typeof selectListOption;

export type SelectListOptionProps<Tag extends 'a' | 'button'> = {
	as?: Tag;
	size?: ThemeSize;
	theme?: ThemeColor;
	key?: SelectListItemKey;
	variant?: SelectListOptionVariant;
};

export const selectListOptionDefaults: SelectListOptionProps<'a'> = {
	as: 'a',
	size: 'sm',
	theme: 'frame',
	variant: 'default'
};
