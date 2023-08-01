import { placeholder } from '../../constants/placeholder';
import type { NotificationPosition } from './module';

export const notificationsPosition = {
	'bottom-right': { x: 400, y: 0 },
	'top-right': { x: 400, y: 0 },
	'bottom-left': { x: -400, y: 0 },
	'top-left': { x: -400, y: 0 },
	'bottom-center': { x: 0, y: 0 },
	'top-center': { x: 0, y: 0 }
} as Record<NotificationPosition, { x: number; y: number }>;

export const notifications = {
	default: { ...placeholder }
};
