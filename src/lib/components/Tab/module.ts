import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeSize
} from '$lib/types';

export type TabVariant = 'flushed' | 'filled' | 'pills' | 'text'; 

export type TabProps<Tag extends 'a' | 'button' = 'button'> = {
	as?: Tag;
	disabled?: boolean;
	focused?: ThemeFocused; 
	hovered?: boolean;
	id?: string | null;
	full?: boolean;
	rounded?: ThemeRounded;
	selected?: boolean;
	size?: ThemeSize;
	label: string | number;
	transitioned?: boolean;
	theme?: ThemeColor;
	variant?: TabVariant;
	underlined?: boolean;
};

export const tabDefaults: Partial<TabProps<'button'>> = {
	as: 'button',
	focused: true,
	theme: 'frame',
	variant: 'flushed'
};
