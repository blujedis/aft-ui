import { SvelteComponent } from 'svelte';
declare const __propDef: {
	props: Record<string, never>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: {};
	};
};
export type ToggleOptionsProps = typeof __propDef.props;
export type ToggleOptionsEvents = typeof __propDef.events;
export type ToggleOptionsSlots = typeof __propDef.slots;
export default class ToggleOptions extends SvelteComponent<
	ToggleOptionsProps,
	ToggleOptionsEvents,
	ToggleOptionsSlots
> {}
export {};
