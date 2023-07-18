import type { DisclosureStore } from '$lib/stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { menuController } from './config';
import type { MenuButtonVariant } from '../MenuButton';

export type MenuControllerVariant = keyof typeof menuController;

// export type MenuItemKey = SelectValue;

// export type MenuItem = Record<string, any> & {
//   key?: MenuItemKey;
//   active?: boolean;
// };

export type MenuControllerStore = {
	//
};

export type MenuControllerGlobalProps = {
	full?: boolean;
	strategy?: 'button' | 'text';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	underlined?: boolean;
	variant?: MenuButtonVariant;
};

export type MenuControllerContext = DisclosureStore<MenuControllerStore> & {
	globals: MenuControllerGlobalProps;
};

export type MenuControllerProps = {
	autoclose?: boolean; // on click outside menu close.
	escapable?: boolean; // close panel on escape key.
	store?: DisclosureStore;
	theme?: ThemeColor;
	variant?: MenuControllerVariant;
	visible?: boolean;
};

export const menuControllerDefaults: Partial<MenuControllerProps & MenuControllerGlobalProps> = {
	autoclose: true,
	escapable: true,
	size: 'md',
	strategy: 'button',
	theme: 'default',
	variant: 'default'
};
