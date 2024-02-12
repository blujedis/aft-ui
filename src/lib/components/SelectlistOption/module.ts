import type { ThemeColor, ThemeSize } from '$lib/types';
import type { SelectListItemKey } from '../SelectList';

export type SelectListOptionProps<Tag extends 'a' | 'button'> = {
	as?: Tag;
	focused?: boolean;
	hovered?: boolean;
	removable?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	key?: SelectListItemKey;
};

export const selectListOptionDefaults: SelectListOptionProps<'a'> = {
	as: 'a',
	size: 'sm',
	theme: 'frame'
};
