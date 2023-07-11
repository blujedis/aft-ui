import { createEventDispatcher } from 'svelte';
export function createDispatcher(name, map = {}) {
    const dispatcher = createEventDispatcher();
    dispatcher.$name = name;
    return dispatcher;
}
