import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		value?: string | undefined;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type SelectPositionProps = typeof __propDef.props;
export type SelectPositionEvents = typeof __propDef.events;
export type SelectPositionSlots = typeof __propDef.slots;
export default class SelectPosition extends SvelteComponentTyped<
	SelectPositionProps,
	SelectPositionEvents,
	SelectPositionSlots
> {}
export {};
