import { writable, get, type Writable } from 'svelte/store';

interface DisclosureBaseProps {
	visible?: boolean;
}

export type DisclosureProps<P extends Record<string, unknown> = Record<string, unknown>> =
	DisclosureBaseProps & P;

export interface DisclosureMethods<P extends Record<string, unknown> = Record<string, unknown>> {
	open: () => void;
	close: () => void;
	toggle: () => void;
	modify: (values: Partial<DisclosureProps<P>>) => void;
}

export type DisclosureStore<P extends Record<string, unknown> = Record<string, unknown>> = Writable<
	DisclosureProps<P>
> &
	DisclosureMethods<P>;

export function useDisclosure<P extends Record<string, unknown> = Record<string, unknown>>(
	props = {} as DisclosureProps<P>
) {
	const store = writable({ visible: false, ...props } as Required<DisclosureProps<P>>);

	function getStore() {
		return get(store);
	}

	function handleUpdate(newStore: DisclosureProps<P>) {
		// Placeholder.
		return newStore as Required<DisclosureProps<P>>;
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

	function modify(values: Partial<DisclosureProps<P>>) {
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
