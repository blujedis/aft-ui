import type { NotificationPosition } from '$lib/components/Notifications';
import { writable, get as getSvelteStore, type Writable } from 'svelte/store';
import type { Notification } from '$lib/components/Notification/module';

export type NotificationState = 'enabled' | 'locked' | 'unlocked';

export interface NotificationOptions {
	dismissible?: boolean;
	duration?: number; // set 0 for static until dismissed.
	group: string;
	max?: number;
	position?: NotificationPosition;
}

export interface NotificationStore extends Writable<Notification[]> {
	get: (key: string) => Notification | undefined;
	add: (item: Notification) => void;
	remove: (key: string) => void;
	lock: (group: string) => void;
	unlock: (group: string) => void;
	setOptions: (options: Partial<NotificationOptions>, update?: boolean) => void;
}

const initialDefaults = {
	position: 'top-right' as NotificationPosition,
	dismissible: true,
	duration: 3500, // set 0 for static until dismissed.
	group: 'default',
	max: 0
};

const metadata = writable({ default: { state: 'enabled', ...initialDefaults } } as Required<
	Record<string, NotificationOptions & { state: NotificationState }>
>);

/**
 * Generates a cheap unique ID.
 *
 * @param radix the numberic value used to convert to strings.
 */
function uniqid(radix = 16) {
	return '#' + ((Math.random() * 0xffffff) << 0).toString(radix);
}

function getWritableStore<T>(instance: Writable<T>) {
	return getSvelteStore(instance) as Required<T>;
}

function getGroup(group: string) {
	return getWritableStore(metadata)[group] as Required<
		NotificationOptions & {
			state: NotificationState;
		}
	>;
}

function getOptions(group: string) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { state, ...rest } = getGroup(group);
	return rest;
}

function getState(group: string) {
	return getGroup(group).state;
}

function setState(group: string, state: NotificationState) {
	metadata.update((m) => {
		m[group] = { ...m[group], state };
		return m;
	});
}

/**
 * Creates a new notification store.
 *
 * @param initOptions the options to be used globally.
 */
export function createNotificationStore(
	initOptions = {} as NotificationOptions
): NotificationStore {
	initOptions.group = initOptions.group || 'default';
	const { group: initGroup, ...rest } = initOptions;

	metadata.update((m) => ({
		...m,
		[initGroup]: {
			...initialDefaults,
			...rest,
			state: 'enabled'
		} as Required<NotificationOptions> & { state: NotificationState }
	}));

	const store = writable([] as Notification[]);

	/**
	 * Gets the notification items from store.
	 */
	function getItems() {
		return getWritableStore(store);
	}

	/**
	 * Gets a notification by its key.
	 *
	 * @param key the key to use to get notification object.
	 */
	function get(key: string) {
		return getItems().find((item) => item.key === key);
	}

	/**
	 * Adds a new notification to the stack.
	 *
	 * @param notification the notification object to be added.
	 */
	function add(notification: Notification) {
		// Unique key for removal.
		const key = notification.key || uniqid();
		const items = getItems();

		if (items.find((n) => n.key === key))
			throw new Error(`Notifications cannot use duplicate key "${key}".`);

		const group = notification.group || 'default';

		const options = getOptions(group);

		// Merge with defaults.
		notification = { ...options, ...notification, key, group };

		store.update((n) => {
			let result = [notification, ...n];
			if (options.position.startsWith('bottom')) result = [...n, notification];
			return result;
		});

		let timeoutid: any;

		const createTimeout = () => {
			timeoutid = setTimeout(() => {
				clearTimeout(timeoutid);
				const state = getState(group);
				if (state === 'locked') {
					createTimeout();
				} else if (state === 'unlocked') {
					setState(group, 'enabled');
					createTimeout();
				} else {
					remove(key);
				}
			}, notification.duration);
		};

		if (notification.duration) createTimeout();
	}

	/**
	 * Removes a notification by its key.
	 *
	 * @param key the notification key to be removed.
	 */
	function remove(key: string) {
		store.update((notifications) => notifications.filter((n) => n.key !== key));
	}

	/**
	 * Locks items so they cannot be removed.
	 */
	function lock(group = 'default') {
		setState(group, 'locked');
	}

	/**
	 * Unlocks items so they can be removed.
	 */
	function unlock(group = 'default') {
		setState(group, 'unlocked');
	}

	/**
	 * Sets the options with new values.
	 *
	 * @param newOptions object containing updated options.
	 */
	function setOptions(options: Partial<NotificationOptions>, update = false) {
		options.group = options.group || 'default';
		const group = options.group || 'default';
		metadata.update((m) => {
			if (update) m[group] = { ...getGroup(group), ...options };
			else m[group] = { ...initialDefaults, ...options, state: 'enabled' };
			return m;
		});
	}

	return {
		...store,
		get,
		add,
		remove,
		lock,
		unlock,
		setOptions
	};
}

const useNotifications = createNotificationStore();

export default useNotifications;
