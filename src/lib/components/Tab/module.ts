import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
} from '$lib/types';

export type TabVariant = 'flushed' | 'filled' | 'outlined' | 'text'; 

export type TabProps<Tag = 'a'> = {
	as: Tag;
	disabled?: boolean;
	focused?: ThemeFocused; 
	hovered?: boolean;
	full?: boolean;
	rounded?: ThemeRounded;
	size?: ThemeSize;
	transitioned?: boolean;
	theme?: ThemeColor;
	value: string | number;
	variant?: TabVariant;
	underlined?: boolean;
};

export const tabDefaults: Partial<TabProps<any>> = {
	focused: true,
	theme: 'default',
	variant: 'flushed'
};
