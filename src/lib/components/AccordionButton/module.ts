import type { SelectValue } from '$lib/stores/select';
import type { ThemeColor, HTMLTag, Iconify } from '../../types';
import type { ButtonProps } from '../Button';
import type { accordionButton } from './config';

export type AccordionButtonVariant = keyof typeof accordionButton;

// export type AccordionButtonIcon = string | IconifyIcon;

export type AccordianButtonProps = Omit<ButtonProps<'button'>, 'variant' | 'full'> & {
	caret?: Iconify; // AccordionButtonIcon | [AccordionButtonIcon, AccordionButtonIcon];
	htag?: HTMLTag; // wraps button used for aria-labelledby undefined to disable.
	roticon?: boolean | string; // when true rotate expand icon ignore collapse.
	key?: SelectValue;
	theme?: ThemeColor;
	variant?: AccordionButtonVariant;
};

export const accordionButtonDefaults: Partial<AccordianButtonProps> = {
	focused: 'visible',
	caret: 'octicon:chevron-down-24', // ['octicon:chevron-down-24', 'octicon:chevron-up-24'],
	roticon: true,
	size: 'sm',
	theme: 'default',
	variant: 'default'
};
