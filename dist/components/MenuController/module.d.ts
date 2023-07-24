import type { DisclosureStore } from '../../stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { menuController } from './config';
import type { MenuButtonVariant } from '../MenuButton';
export type MenuControllerVariant = keyof typeof menuController;
export type MenuControllerStore = {};
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
    autoclose?: boolean;
    escapable?: boolean;
    store?: DisclosureStore;
    theme?: ThemeColor;
    variant?: MenuControllerVariant;
    visible?: boolean;
};
export declare const menuControllerDefaults: Partial<MenuControllerProps & MenuControllerGlobalProps>;
