import type { ThemeColor, ThemeSize } from '../../types';
export type MenuOptionProps<Tag extends 'a' | 'button'> = {
    active?: boolean;
    as?: Tag;
    focused?: boolean;
    hovered?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
};
export declare const menuOptionDefaults: MenuOptionProps<'a'>;
