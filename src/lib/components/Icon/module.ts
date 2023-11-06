import type { ThemeColor, ThemeSize } from '$lib/types';
import type { IconProps as IconifyIconProps } from '@iconify/svelte';

export type IconProps = IconifyIconProps & {
	class?: string;
	size?: ThemeSize;
	theme?: ThemeColor;
	unstyled?: boolean;
};

export const iconDefaults = {
	size: 'md'
};
