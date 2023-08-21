import type {
	ThemeAnimation,
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeVariant
} from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';
import type { NotificationPosition } from '../Notifications';

export type AvatarVariant = Exclude<ThemeVariant, 'text' | 'flushed'>;

export type AvatarNotificationPosition = Exclude<
	NotificationPosition,
	'top-center' | 'bottom-center'
>;

export type AvatarProps = {
	alt: string;
	notification?: boolean | AvatarNotificationPosition;
	animate?: ThemeAnimation;
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
	theme: 'default',
	variant: 'filled'
};
