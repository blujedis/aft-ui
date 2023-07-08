import { SvelteComponent } from 'svelte';
import { type NotificationVariant, type NotificationProps } from '../Notification';
export declare class NotificationComponent extends SvelteComponent<NotificationProps> {}
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
export declare const notificationControllerDefaults: NotificationControllerProps;
