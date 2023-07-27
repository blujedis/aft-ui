import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { tab } from './config';

export type TabVariant = keyof typeof tab;

export type TabProps<Tag = 'a'> = {
	as: Tag;
	disabled?: boolean;
	focused?: ThemeFocused; // true = focus-visible.
	full?: boolean;
	rounded?: ThemeRounded;
	size?: ThemeSize;
	transitioned?: ThemeTransitioned;
	theme?: ThemeColor;
	value: string | number;
	variant?: TabVariant;
	underlined?: boolean;
};

export const tabDefaults: Partial<TabProps<any>> = {
	theme: 'light',
	variant: 'default'
};
