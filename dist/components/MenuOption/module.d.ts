import type { ThemeColor, ThemeSize } from '../../types';
import type { MenuButtonVariant } from '../MenuButton';
export type MenuOptionProps<Tag extends 'a' | 'button'> = {
    active?: boolean;
    as?: Tag;
    size?: ThemeSize;
    theme?: ThemeColor;
    key?: string | number;
    variant?: MenuButtonVariant;
};
export declare const menuOptionDefaults: MenuOptionProps<'a'>;
