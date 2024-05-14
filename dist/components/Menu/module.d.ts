import type { DisclosureStore } from '../../stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { MenuButtonVariant } from '../MenuButton';
export type MenuStore = {};
export type MenuGlobalProps = {
    disabled?: boolean;
    full?: boolean;
    focused?: boolean;
    hovered?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    underlined?: boolean;
    variant?: MenuButtonVariant;
};
export type MenuContext = DisclosureStore<MenuStore> & {
    globals: MenuGlobalProps;
};
export type MenuProps = {
    autoclose?: boolean;
    escapable?: boolean;
    disabled?: boolean;
    focused?: boolean;
    hovered?: boolean;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: MenuButtonVariant;
    visible?: boolean;
};
export declare const menuDefaults: Partial<MenuProps & MenuGlobalProps>;
