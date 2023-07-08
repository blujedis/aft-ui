import { writable, get } from 'svelte/store';
export function useDisclosure(props = {}) {
	const store = writable({ visible: false, ...props });
	function getStore() {
		return get(store);
	}
	function handleUpdate(newStore) {
		// Placeholder.
		return newStore;
	}
	function open() {
		store.update((s) => handleUpdate({ ...s, visible: true }));
	}
	function close() {
		store.update((s) => handleUpdate({ ...s, visible: false }));
	}
	function toggle() {
		const visible = getStore().visible;
		store.update((s) => handleUpdate({ ...s, visible: !visible }));
	}
	function modify(values) {
		console.log(values);
		store.update((s) => handleUpdate({ ...s, ...values }));
	}
	return {
		...store,
		open,
		close,
		toggle,
		modify
	};
}
