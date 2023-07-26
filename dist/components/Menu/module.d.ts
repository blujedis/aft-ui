import type { DisclosureStore } from '../../stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { menu } from './config';
import type { MenuButtonVariant } from '../MenuButton';
export type MenuVariant = keyof typeof menu;
export type MenuStore = {};
export type MenuGlobalProps = {
    full?: boolean;
    strategy?: 'button' | 'text';
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
    autoclose?: boolean;
    escapable?: boolean;
    store?: DisclosureStore;
    theme?: ThemeColor;
    variant?: MenuVariant;
    visible?: boolean;
};
export declare const menuDefaults: Partial<MenuProps & MenuGlobalProps>;
