import type { SelectValue } from '$lib/stores/select';
import type { ThemeColor, HTMLTag } from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
import type { ButtonProps } from '../Button';
import type { accordionButton } from './config';

export type AccordionButtonVariant = keyof typeof accordionButton;

export type AccordionButtonIcon = string | IconifyIcon;

export type AccordianButtonProps = Omit<ButtonProps<'button'>, 'variant' | 'full'> & {
	icon?: AccordionButtonIcon | [AccordionButtonIcon, AccordionButtonIcon];
	htag?: HTMLTag; // wraps button used for aria-labelledby undefined to disable.
	roticon?: boolean | string; // when true rotate expand icon ignore collapse.
	name?: SelectValue;
	theme?: ThemeColor;
	variant?: AccordionButtonVariant;
};

export const accordionButtonDefaults: Partial<AccordianButtonProps> = {
	icon: ['mdi:chevron-down', 'mdi:chevron-up'],
	roticon: false,
	size: 'md',
	theme: 'default',
	variant: 'default'
};
