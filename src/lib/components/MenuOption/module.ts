import type { ThemeColor, ThemeSize } from '$lib/types';

export type MenuOptionProps<Tag extends 'a' | 'button'> = {
	active?: boolean;
	as?: Tag;
	focused?: boolean;
	hovered?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	key?: string | number;
};

export const menuOptionDefaults: MenuOptionProps<'a'> = {
	as: 'a',
	size: 'sm',
};
