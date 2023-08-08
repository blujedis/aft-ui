import type { SelectStoreValue } from '../../stores/select';
import type { ThemeColor, HTMLTag, Iconify } from '../../types';
import type { ButtonProps } from '../Button';
import type { accordionButton } from './config';
export type AccordionButtonVariant = keyof typeof accordionButton;
export type AccordianButtonProps = Omit<ButtonProps<'button'>, 'variant' | 'full'> & {
    caret?: Iconify;
    htag?: HTMLTag;
    roticon?: boolean | string;
    key?: SelectStoreValue;
    theme?: ThemeColor;
    variant?: AccordionButtonVariant;
};
export declare const accordionButtonDefaults: Partial<AccordianButtonProps>;
