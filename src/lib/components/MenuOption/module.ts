import type { ThemeColor, ThemeSize, ThemeVariant } from '$lib/types';

export type MenuOptionVariant = Exclude<ThemeVariant, 'text'>; //  keyof typeof menuOption;

export type MenuOptionProps<Tag extends 'a' | 'button'> = {
	active?: boolean;
	as?: Tag;
	size?: ThemeSize;
	theme?: ThemeColor;
	key?: string | number;
	variant?: MenuOptionVariant;
};

export const menuOptionDefaults: MenuOptionProps<'a'> = {
	as: 'a',
	size: 'sm',
	theme: 'default',
	variant: 'filled'
};
