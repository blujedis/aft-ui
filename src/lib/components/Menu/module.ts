import type { DisclosureStore } from '$lib/stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { menu } from './config';
import type { MenuButtonVariant } from '../MenuButton';

export type MenuVariant = keyof typeof menu;

export type MenuStore = {
	//
};

export type MenuGlobalProps = {
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	underlined?: boolean;
	variant?: MenuButtonVariant;
};

export type MenuContext = DisclosureStore<MenuStore> & {
	globals: MenuGlobalProps;
};

export type MenuProps = {
	autoclose?: boolean; // on click outside menu close.
	escapable?: boolean; // close panel on escape key.
	store?: DisclosureStore;
	theme?: ThemeColor;
	variant?: MenuVariant;
	visible?: boolean;
};

export const menuDefaults: Partial<MenuProps & MenuGlobalProps> = {
	autoclose: true,
	escapable: true,
	size: 'md',
	theme: 'light',
	variant: 'default'
};
