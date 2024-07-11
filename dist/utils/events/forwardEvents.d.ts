/**
 * Modified from both
 * @see https://github.com/hperrin/svelte-material-ui/blob/master/packages/accordion/src/Header.svelte
 *
 * @see https://github.com/rgossiaux/svelte-headlessui/blob/master/$lib/internal/forwardEventsBuilder.ts
 */
import type { SvelteComponent } from 'svelte';
type ForwardException = string | {
    name: string;
    shouldExclude: () => boolean;
};
export declare function forwardEventsBuilder(component: SvelteComponent, except?: ForwardException[]): (node: HTMLElement | SVGElement) => {
    destroy: () => void;
};
export {};
