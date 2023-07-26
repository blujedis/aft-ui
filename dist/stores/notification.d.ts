import { type Writable } from 'svelte/store';
import type { NotificationItem } from '../components/Notification';
import type { NotificationPosition } from '../components/Notification';
export type NotificationState = 'enabled' | 'locked' | 'unlocked';
export interface NotificationOptions {
    dismissible?: boolean;
    duration?: number;
    group: string;
    max?: number;
    position?: NotificationPosition;
}
export interface NotificationStore extends Writable<NotificationItem[]> {
    get: (key: string) => NotificationItem | undefined;
    add: (item: NotificationItem) => void;
    remove: (key: string) => void;
    lock: (group: string) => void;
    unlock: (group: string) => void;
    setOptions: (options: Partial<NotificationOptions>, update?: boolean) => void;
}
/**
 * Creates a new notification store.
 *
 * @param options the options to be used globally.
 */
export declare function createNotificationStore(initOptions?: NotificationOptions): NotificationStore;
declare const useNotifications: NotificationStore;
export default useNotifications;
