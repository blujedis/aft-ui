
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

declare module 'svelte/internal' {
	export const get_current_component: any;
}

// import type { IconProps as IconIconifyProps } from '@iconify/svelte';

// declare module '@iconify/svelte' {
// 	export type IconProps = IconIconifyProps & {
// 		class?: string;
// 		size?: ThemeSize;
// 		unstyled?: boolean;
// 	}
// 	export default class Icon extends SvelteComponent<IconProps> {}
// }

declare namespace svelte.JSX {
	interface HTMLAttributes {
		onclick_outside: (e: any) => void;
	}
}
