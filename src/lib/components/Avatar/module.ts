import type {
	ThemeAnimation,
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	TypeOrValue,
} from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';
import type { NotificationPosition } from '../Notifications';
import type { avatar } from './config';

export type AvatarVariant = 'filled' | 'outlined' | 'soft'; //  keyof typeof avatar;

export type AvatarNotificationPosition = Exclude<
	NotificationPosition,
	'top-center' | 'bottom-center'
>;

export type AvatarProps = {
	alt: string;
	animate?: ThemeAnimation;
	hovered?: boolean;
	counter?: number | string;
	notification?: boolean | AvatarNotificationPosition;
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
	variant: 'filled'
};
