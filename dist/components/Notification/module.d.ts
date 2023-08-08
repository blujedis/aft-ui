import type { notification } from './config';
import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
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
export declare const notificationDefaults: Partial<NotificationProps>;
