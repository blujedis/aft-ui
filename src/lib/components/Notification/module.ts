import type { notification } from './config';
import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';

export type NotificationVariant = keyof typeof notification;

export type Notification = {
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

export interface NotificationProps extends Notification {
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
}

export const notificationDefaults: Partial<NotificationProps> = {
	dismissible: true,
	duration: 3500,
	group: 'default',
	rounded: 'sm',
	shadowed: 'md',
	theme: 'light',
	variant: 'filled'
};
