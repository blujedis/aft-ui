import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: Record<string, never>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type ExampleProps = typeof __propDef.props;
export type ExampleEvents = typeof __propDef.events;
export type ExampleSlots = typeof __propDef.slots;
export default class Example extends SvelteComponentTyped<
	ExampleProps,
	ExampleEvents,
	ExampleSlots
> {}
export {};
