import { SvelteComponent } from 'svelte';
import Notification, {
	type NotificationVariant,
	type NotificationProps
} from '$lib/components/Notification';

export class NotificationComponent extends SvelteComponent<NotificationProps> {}

export type NotificationPosition =
	| 'top-right'
	| 'bottom-right'
	| 'top-left'
	| 'bottom-left'
	| 'top-center'
	| 'bottom-center';

export interface NotificationControllerProps {
	Component?: typeof NotificationComponent;
	duration?: number;
	group?: string;
	position?: NotificationPosition;
	variant?: NotificationVariant;
}

export const notificationControllerDefaults: NotificationControllerProps = {
	Component: Notification,
	group: 'default',
	duration: 3500,
	position: 'top-right',
	variant: 'default'
};
