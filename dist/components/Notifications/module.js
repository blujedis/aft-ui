import { SvelteComponent } from 'svelte';
import { Notification } from '../Notification';
export class NotificationsComponent extends SvelteComponent {
}
export const notificationsDefaults = {
    Component: Notification,
    group: 'default',
    duration: 4000,
    position: 'top-right',
    transition: 'reveal'
};
export const notificationsPosition = {
    'bottom-right': { x: 400, y: 0 },
    'top-right': { x: 400, y: 0 },
    'bottom-left': { x: -400, y: 0 },
    'top-left': { x: -400, y: 0 },
    'bottom-center': { x: 0, y: 0 },
    'top-center': { x: 0, y: 0 }
};
