import type { SelectStoreValue } from '../../stores/select';
import type { ThemeColor, Iconify, HTMLTag } from '../../types';
import type { ButtonProps } from '../Button';
export type AccordionVariant = 'filled' | 'outlined' | 'text';
export type AccordianButtonProps<Tag extends HTMLTag> = Omit<ButtonProps<'button'>, 'as' | 'variant' | 'full' | 'focused' | 'underlined' | 'rounded' | 'shadowed' | 'href'> & {
    as?: Tag;
    caret?: Iconify;
    roticon?: boolean | string;
    rotiangle?: 90 | 180;
    selectable?: boolean;
    key?: SelectStoreValue;
    theme?: ThemeColor;
    variant?: AccordionVariant;
};
export declare const accordionButtonDefaults: Partial<AccordianButtonProps<'button'>>;
