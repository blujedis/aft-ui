import type { ThemeColor, ThemeSize } from '$lib/types';

export type MenuOptionProps<Tag extends 'a' | 'button'> = {
	active?: boolean;
	as?: Tag;
	focused?: boolean;
	hovered?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
};

export const menuOptionDefaults: MenuOptionProps<'a'> = {
	as: 'a',
	focused: true,
	size: 'sm'
};
