import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		enabled?: boolean | undefined;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: {};
	};
};
export type DarkModeProps = typeof __propDef.props;
export type DarkModeEvents = typeof __propDef.events;
export type DarkModeSlots = typeof __propDef.slots;
export default class DarkMode extends SvelteComponentTyped<
	DarkModeProps,
	DarkModeEvents,
	DarkModeSlots
> {}
export {};
