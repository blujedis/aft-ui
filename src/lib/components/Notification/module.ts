import type { notification } from './config';
import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/theme';
import type { IconifyIcon } from '@iconify/svelte';

export type NotificationVariant = keyof typeof notification;

export type NotificationItem = {
	key?: string;
	group?: string;
	icon?: string | IconifyIcon;
	description: string;
	dismissible?: boolean;
	duration?: number;
	title?: string;
	theme?: ThemeColor;
	variant?: NotificationVariant;
};

export interface NotificationProps extends NotificationItem {
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
}

export const notificationsDefaults: Partial<NotificationProps> = {
	dismissible: true,
	duration: 3500,
	group: 'default',
	rounded: 'sm',
	shadowed: 'md',
	theme: 'default',
	variant: 'default'
};
