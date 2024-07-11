declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:click_outside'?: CompositionEventHandler<T>;
	}
}

/**
 * @see https://unpkg.com/browse/svelte@3.0.0/internal.mjs
 */
declare module 'svelte/internal' {
	declare const get_current_component: () => any;
	declare const bubble: (component: any, event: any) => void;
	declare const listen: (node: any, event: any, handler: any, options?: any) => () => any;
	declare const prevent_default: (fn: any) => (event: any) => any;
	declare const stop_propagation: (fn: any) => (event: any) => any;
}
