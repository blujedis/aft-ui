import { writable } from 'svelte/store';
export function useDisclosure(props = {}) {
    const store = writable({ visible: false, ...props });
    function open() {
        store.update((s) => {
            return { ...s, visible: true };
        });
    }
    function close() {
        store.update((s) => {
            return { ...s, visible: false };
        });
    }
    function toggle() {
        store.update((s) => {
            return { ...s, visible: !s.visible };
        });
    }
    function modify(values) {
        store.update((s) => {
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
