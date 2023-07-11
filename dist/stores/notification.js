import { writable, get as getSvelteStore } from 'svelte/store';
const initialDefaults = {
    position: 'top-right',
    dismissible: true,
    duration: 3500,
    group: 'default',
    max: 0
};
const metadata = writable({ default: { state: 'enabled', ...initialDefaults } });
/**
 * Generates a cheap unique ID.
 *
 * @param radix the numberic value used to convert to strings.
 */
function uniqid(radix = 16) {
    return '#' + ((Math.random() * 0xffffff) << 0).toString(radix);
}
function getWritableStore(instance) {
    return getSvelteStore(instance);
}
function getGroup(group) {
    return getWritableStore(metadata)[group];
}
function getOptions(group) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { state, ...rest } = getGroup(group);
    return rest;
}
function getState(group) {
    return getGroup(group).state;
}
function setState(group, state) {
    metadata.update((m) => {
        m[group] = { ...m[group], state };
        return m;
    });
}
/**
 * Creates a new notification store.
 *
 * @param options the options to be used globally.
 */
export function createNotificationStore(initOptions = {}) {
    initOptions.group = initOptions.group || 'default';
    const { group: initGroup, ...rest } = initOptions;
    metadata.update((m) => ({
        ...m,
        [initGroup]: {
            ...initialDefaults,
            ...rest,
            state: 'enabled'
        }
    }));
    const store = writable([]);
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
    function get(key) {
        return getItems().find((item) => item.key === key);
    }
    /**
     * Adds a new notification to the stack.
     *
     * @param notification the notification object to be added.
     */
    function add(notification) {
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
            if (options.position.startsWith('bottom'))
                result = [...n, notification];
            return result;
        });
        let timeoutid;
        const createTimeout = () => {
            timeoutid = setTimeout(() => {
                clearTimeout(timeoutid);
                const state = getState(group);
                if (state === 'locked') {
                    createTimeout();
                }
                else if (state === 'unlocked') {
                    setState(group, 'enabled');
                    createTimeout();
                }
                else {
                    remove(key);
                }
            }, notification.duration);
        };
        if (notification.duration)
            createTimeout();
    }
    /**
     * Removes a notification by its key.
     *
     * @param key the notification key to be removed.
     */
    function remove(key) {
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
    function setOptions(options, update = false) {
        options.group = options.group || 'default';
        const group = options.group || 'default';
        metadata.update((m) => {
            if (update)
                m[group] = { ...getGroup(group), ...options };
            else
                m[group] = { ...initialDefaults, ...options, state: 'enabled' };
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
