import type { SelectValue } from '../../stores/select';
import type { ThemeColor, HTMLTag } from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
import type { ButtonProps } from '../Button';
import type { accordionButton } from './config';
export type AccordionButtonVariant = keyof typeof accordionButton;
export type AccordionButtonIcon = string | IconifyIcon;
export type AccordianButtonProps = Omit<ButtonProps<'button'>, 'variant' | 'full'> & {
    icon?: AccordionButtonIcon | [AccordionButtonIcon, AccordionButtonIcon];
    htag?: HTMLTag;
    roticon?: boolean | string;
    key?: SelectValue;
    theme?: ThemeColor;
    variant?: AccordionButtonVariant;
};
export declare const accordionButtonDefaults: Partial<AccordianButtonProps>;
