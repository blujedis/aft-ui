import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		label?: string | undefined;
		value?: any;
		placeholder?: string | false | null | undefined;
		items?:
			| (
					| string
					| {
							label: string;
							value: string | number;
					  }
			  )[]
			| undefined;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type SelectProps = typeof __propDef.props;
export type SelectEvents = typeof __propDef.events;
export type SelectSlots = typeof __propDef.slots;
export default class Select extends SvelteComponentTyped<SelectProps, SelectEvents, SelectSlots> {}
export {};
