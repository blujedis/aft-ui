import { SvelteComponent } from 'svelte';
import { type NotificationProps } from '../Notification';
export declare class NotificationsComponent extends SvelteComponent<NotificationProps> {
}
export type NotificationPosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' | 'top-center' | 'bottom-center';
export interface NotificationsProps {
    Component?: typeof NotificationsComponent;
    duration?: number;
    group?: string;
    position?: NotificationPosition;
    transition?: 'zoom' | 'reveal' | 'none';
}
export declare const notificationsDefaults: NotificationsProps;
export declare const notificationsPosition: Record<NotificationPosition, {
    x: number;
    y: number;
}>;
