
declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:click_outside'?: CompositionEventHandler<T>;
	}
}


declare module 'svelte/internal' {
	declare const get_current_component: any;
}
