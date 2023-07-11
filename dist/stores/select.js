import { ensureArray } from '../utils';
import { writable, get } from 'svelte/store';
export function useSelect(props = {}) {
    props.selected = ensureArray(props.selected).filter((v) => typeof v !== 'undefined');
    const initialSelected = [...props.selected];
    const store = writable({ multiple: false, ...props });
    function getStore() {
        return get(store);
    }
    function select(value) {
        if (typeof value === 'undefined')
            return;
        store.update((s) => {
            let selected = [];
            const multiple = s.multiple;
            if (multiple)
                selected = s.selected.includes(value) ? s.selected : [...s.selected, value];
            else
                selected = [value];
            return { ...s, selected };
        });
    }
    function unselect(value) {
        if (typeof value === 'undefined')
            return;
        store.update((s) => {
            return { ...s, selected: s.selected.filter((v) => v !== value) };
        });
    }
    function toggle(value) {
        if (typeof value === 'undefined')
            return;
        store.update((s) => {
            let selected = [...s.selected];
            if (selected.includes(value))
                selected = selected.filter((v) => v !== value);
            else if (s.multiple || !selected.length)
                selected = [...selected, value];
            else if (!s.multiple)
                selected = [value];
            return { ...s, selected };
        });
    }
    function reset(...selected) {
        store.update((s) => {
            return { ...s, selected: selected.length ? [...selected] : [...initialSelected] };
        });
    }
    function isSelected(value) {
        if (typeof value === 'undefined')
            return false;
        return getStore().selected.includes(value);
    }
    return {
        ...store,
        reset,
        select,
        unselect,
        toggle,
        isSelected
    };
}
