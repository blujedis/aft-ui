import type { ThemeColor, ThemeSize } from '$lib/types';
import type { SelectListItemKey } from '../SelectList';

export type SelectListOptionProps<Tag extends 'a' | 'button'> = {
	activeStyles?: boolean;
	as?: Tag;
	focused?: boolean;
	hovered?: boolean;
	tags?: boolean;
	removable?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	key?: SelectListItemKey;
};

export const selectListOptionDefaults: SelectListOptionProps<'a'> = {
	as: 'a',
	size: 'sm'
};
