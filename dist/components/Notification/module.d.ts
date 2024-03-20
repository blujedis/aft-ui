import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
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
export declare const notificationDefaults: Partial<NotificationProps>;
