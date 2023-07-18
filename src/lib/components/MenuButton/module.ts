import type { menuButton } from './config';
import { type ButtonProps, buttonDefaults } from '../Button';
import type { IconifyIcon } from '@iconify/svelte';

export type MenuButtonVariant = keyof typeof menuButton;

type ButtonPropsBase = Omit<ButtonProps<'button'>, 'as' | 'focused'>;

export type MenuButtonProps = ButtonPropsBase & {
	caret?: null | string | IconifyIcon;
	roticon?: boolean;
	variant?: MenuButtonVariant;
};

export const menuButtonDefaults = {
	...buttonDefaults,
	caret: 'octicon:chevron-down-24', // 'mdi:chevron-down', //  mdi:unfold-more-horizontal,
	roticon: true
};
