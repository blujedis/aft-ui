import type { ThemeSize } from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';
import type { IconProps } from '../Icon';

export type LoaderProps = Omit<IconProps, 'icon'> & {
	position?: 'left' | 'right';
	visible?: boolean;
	size?: ThemeSize;
	icon?: string | IconifyIcon;
};

export const loaderDefaults: Partial<LoaderProps> = {
	position: 'right',
	icon: 'mdi:loading',
	size: 'md'
};
