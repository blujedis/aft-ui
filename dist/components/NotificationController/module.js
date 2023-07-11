import { SvelteComponent } from 'svelte';
import Notification, {} from '../Notification';
export class NotificationComponent extends SvelteComponent {
}
export const notificationControllerDefaults = {
    Component: Notification,
    group: 'default',
    duration: 3500,
    position: 'top-right',
    variant: 'default'
};
