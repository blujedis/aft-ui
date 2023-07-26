import { writable, get, type Writable } from 'svelte/store';

interface DisclosureBaseOptions {
	visible?: boolean;
}

export type DisclosureStoreOptions<P extends Record<string, unknown> = Record<string, unknown>> =
	DisclosureBaseOptions & P;

export interface DisclosureMethods<P extends Record<string, unknown> = Record<string, unknown>> {
	open: () => void;
	close: () => void;
	toggle: () => void;
	modify: (values: Partial<DisclosureStoreOptions<P>>) => void;
}

export type DisclosureStore<P extends Record<string, unknown> = Record<string, unknown>> = Writable<
	DisclosureStoreOptions<P>
> &
	DisclosureMethods<P>;

export function useDisclosure<P extends Record<string, unknown> = Record<string, unknown>>(
	props = {} as DisclosureStoreOptions<P>
) {
	const store = writable({ visible: false, ...props } as Required<DisclosureStoreOptions<P>>);

	function getStore() {
		return get(store);
	}

	function handleUpdate(newStore: DisclosureStoreOptions<P>) {
		// Placeholder.
		return newStore as Required<DisclosureStoreOptions<P>>;
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

	function modify(values: Partial<DisclosureStoreOptions<P>>) {
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
