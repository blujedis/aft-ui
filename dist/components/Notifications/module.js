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
