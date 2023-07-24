import { SvelteComponent } from 'svelte';
import Notification, {
	type NotificationVariant,
	type NotificationProps
} from '../Notification';

export class NotificationsComponent extends SvelteComponent<NotificationProps> { }

export type NotificationPosition =
	| 'top-right'
	| 'bottom-right'
	| 'top-left'
	| 'bottom-left'
	| 'top-center'
	| 'bottom-center';

export interface NotificationsProps {
	Component?: typeof NotificationsComponent;
	duration?: number;
	group?: string;
	position?: NotificationPosition;
	variant?: NotificationVariant;
}

export const notificationsDefaults: NotificationsProps = {
	Component: Notification,
	group: 'default',
	duration: 3500,
	position: 'top-right',
	variant: 'default'
};
