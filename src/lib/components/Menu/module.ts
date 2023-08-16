import type { DisclosureStore } from '$lib/stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { MenuButtonVariant } from '../MenuButton';

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
	variant?: MenuButtonVariant;
	visible?: boolean;
};

export const menuDefaults: Partial<MenuProps & MenuGlobalProps> = {
	autoclose: true,
	escapable: true,
	size: 'md',
	theme: 'default',
	variant: 'filled'
};
