import type { SelectStoreValue } from '$lib/stores/select';
import type { ThemeColor, Iconify } from '../../types';
import type { ButtonProps } from '../Button';
import type { accordionButton } from './config';

export type AccordionVariant = keyof typeof accordionButton

export type AccordianButtonProps = Omit<ButtonProps<'button'>, 'variant' | 'full'> & {
	caret?: Iconify; // AccordionButtonIcon | [AccordionButtonIcon, AccordionButtonIcon];
	// htag?: HTMLTag; // wraps button used for aria-labelledby undefined to disable.
	roticon?: boolean | string; // when true rotate expand icon ignore collapse.
	key?: SelectStoreValue;
	theme?: ThemeColor;
	variant?: AccordionVariant;
};

export const accordionButtonDefaults: Partial<AccordianButtonProps> = {
	caret: 'octicon:chevron-down-24', // ['octicon:chevron-down-24', 'octicon:chevron-up-24'],
	focused: true,
	roticon: true,
	size: 'sm',
	theme: 'default',
	variant: 'outlined'
};