import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';
import type { avatar } from './config';
import type { NotificationPosition } from '../Notifications';

export type AvatarVariant = keyof typeof avatar;

export type AvatarProps = {
	alt: string;
	notification?: boolean | Exclude<NotificationPosition, 'top-center' | 'bottom-center'>;
	animation?: 'ping' | 'pulse';
	placeholder?: boolean | string | IconifyIcon;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	src: string;
	stacked?: 'up' | 'down';
	theme?: ThemeColor;
	variant?: AvatarVariant;
};

export const avatarDefaults: Partial<AvatarProps> = {
	size: 'md',
	theme: 'light',
	variant: 'default'
};
