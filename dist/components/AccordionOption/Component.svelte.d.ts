import { SvelteComponent } from 'svelte';
import type { HTMLTag } from '../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
	props(): Omit<import('svelte/transition').SlideParams, 'axis'> & {
		as?: Tag | undefined;
		name?: import('../../stores/select').SelectValue | undefined;
		size?: import('../..').ThemeSize | undefined;
		theme?: import('../..').ThemeColor | undefined;
		variant?: 'default' | 'outlined' | 'flushed' | 'pills' | undefined;
	} & import('../..').ElementProps<Tag> & {
			class?: import('../..').ClassArgument | import('../..').ClassArgument[];
		};
	events(): {} & {
		[evt: string]: CustomEvent<any>;
	};
	slots(): {
		default: {};
	};
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponent<
	ComponentProps<Tag>,
	ComponentEvents<Tag>,
	ComponentSlots<Tag>
> {}
export {};
