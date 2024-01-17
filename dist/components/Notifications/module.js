import { SvelteComponent } from 'svelte';
import { Notification } from '../Notification';
export class NotificationsComponent extends SvelteComponent {
}
export const notificationsDefaults = {
    Component: Notification,
    group: 'default',
    duration: 3500,
    position: 'top-right'
};
export const notificationsPosition = {
    'bottom-right': { x: 400, y: 0 },
    'top-right': { x: 400, y: 0 },
    'bottom-left': { x: -400, y: 0 },
    'top-left': { x: -400, y: 0 },
    'bottom-center': { x: 0, y: 0 },
    'top-center': { x: 0, y: 0 }
};
