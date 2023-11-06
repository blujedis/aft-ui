import type { ThemeColor, ThemeSize } from '$lib/types';
import type { MenuButtonVariant } from '../MenuButton';

export type MenuOptionProps<Tag extends 'a' | 'button'> = {
	active?: boolean;
	as?: Tag;
	size?: ThemeSize;
	theme?: ThemeColor;
	key?: string | number;
	variant?: MenuButtonVariant;
};

export const menuOptionDefaults: MenuOptionProps<'a'> = {
	as: 'a',
	size: 'sm',
	theme: 'default',
	variant: 'filled'
};
