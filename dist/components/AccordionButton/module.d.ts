import type { SelectStoreValue } from '../../stores/select';
import type { ThemeColor, Iconify } from '../../types';
import type { ButtonProps } from '../Button';
import type { accordionButton } from './config';
export type AccordionVariant = keyof typeof accordionButton;
export type AccordianButtonProps = Omit<ButtonProps<'button'>, 'variant' | 'full'> & {
    caret?: Iconify;
    roticon?: boolean | string;
    key?: SelectStoreValue;
    theme?: ThemeColor;
    variant?: AccordionVariant;
};
export declare const accordionButtonDefaults: Partial<AccordianButtonProps>;
