/// <reference types="@sveltejs/kit" />
/// <reference types="@svelte" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

// declare module '*.svelte' {
// 	export { SvelteComponentDev as default } from 'svelte/internal';
// }

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclick_outside: (e: any) => void;
	}
}
