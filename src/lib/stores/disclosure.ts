import { writable, type Writable } from 'svelte/store';

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

	function open() {
		store.update(s => {
			return { ...s, visible: true };
		});
	}

	function close() {
		store.update(s => {
			return { ...s, visible: false };
		});
	}

	function toggle() {
		store.update(s => {
			return { ...s, visible: !s.visible };
		});
	}

	function modify(values: Partial<DisclosureStoreOptions<P>>) {
		store.update(s => {
			return { ...s, ...values };
		});
	}

	return {
		...store,
		open,
		close,
		toggle,
		modify
	};
}
