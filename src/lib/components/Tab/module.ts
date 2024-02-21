import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeSize
} from '$lib/types';

export type TabVariant = 'flushed' | 'filled' | 'outlined' | 'text'; 

export type TabProps<Tag extends 'a' | 'button' = 'button'> = {
	as?: Tag;
	disabled?: boolean;
	focused?: ThemeFocused; 
	hovered?: boolean;
	full?: boolean;
	rounded?: ThemeRounded;
	selected?: boolean;
	size?: ThemeSize;
	title?: string | number;
	transitioned?: boolean;
	theme?: ThemeColor;
	value?: string | number;
	variant?: TabVariant;
	underlined?: boolean;
};

export const tabDefaults: Partial<TabProps<'button'>> = {
	as: 'button',
	focused: true,
	theme: 'frame',
	variant: 'flushed'
};
