import type { ThemeColor, ThemeSize } from '../../types';
import type { menuOption } from './config';
export type MenuOptionVariant = keyof typeof menuOption;
export type MenuOptionProps<Tag extends 'a' | 'button'> = {
    active?: boolean;
    as?: Tag;
    size?: ThemeSize;
    theme?: ThemeColor;
    key?: string | number;
    variant?: MenuOptionVariant;
};
export declare const menuOptionDefaults: MenuOptionProps<'a'>;
