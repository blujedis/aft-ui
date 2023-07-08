import { SvelteComponentTyped } from 'svelte';
import { type DropdownOptionProps } from './module';
declare class __sveltets_Render<Tag extends 'a' | 'button'> {
	props(): DropdownOptionProps<Tag> &
		import('../..').ElementProps<Tag> & {
			class?: import('../..').ClassArgument | import('../..').ClassArgument[];
		};
	events(): {} & {
		[evt: string]: CustomEvent<any>;
	};
	slots(): {
		default: {
			selected: boolean;
		};
	};
}
export type ComponentProps<Tag extends 'a' | 'button'> = ReturnType<
	__sveltets_Render<Tag>['props']
>;
export type ComponentEvents<Tag extends 'a' | 'button'> = ReturnType<
	__sveltets_Render<Tag>['events']
>;
export type ComponentSlots<Tag extends 'a' | 'button'> = ReturnType<
	__sveltets_Render<Tag>['slots']
>;
export default class Component<Tag extends 'a' | 'button'> extends SvelteComponentTyped<
	ComponentProps<Tag>,
	ComponentEvents<Tag>,
	ComponentSlots<Tag>
> {}
export {};
