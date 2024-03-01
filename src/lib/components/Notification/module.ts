import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';

//export type NotificationVariant = keyof typeof notification;

export type Notification = {
	key?: string;
	group?: string;
	icon?: string | IconifyIcon;
	description: string;
	dismissible?: boolean;
	duration?: number;
	title?: string;
	theme?: ThemeColor;
};

export interface NotificationProps extends Omit<Notification, 'duration'> {
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
}

export const notificationDefaults: Partial<NotificationProps> = {
	dismissible: true,
	group: 'default',
	rounded: 'sm',
	shadowed: 'md'
};
