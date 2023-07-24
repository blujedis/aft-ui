import type { ThemeSize } from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';
import type { IconProps } from '../Icon';

export type LoaderProps = Omit<IconProps, 'icon'> & {
	visible?: boolean;
	size?: ThemeSize;
	icon?: string | IconifyIcon;
};

export const loaderDefaults: Partial<LoaderProps> = {
	icon: 'mdi:loading',
	size: 'md'
};
