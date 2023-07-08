import { SvelteComponent } from 'svelte';
declare class __sveltets_Render<Tag extends 'button' | 'a'> {
	props(): import('../..').ButtonProps<Tag> & {
		caret?: string | import('@iconify/svelte').IconifyIcon | null | undefined;
		placeholder?: string | undefined;
		roticon?: string | boolean | undefined;
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
export type ComponentProps<Tag extends 'button' | 'a'> = ReturnType<
	__sveltets_Render<Tag>['props']
>;
export type ComponentEvents<Tag extends 'button' | 'a'> = ReturnType<
	__sveltets_Render<Tag>['events']
>;
export type ComponentSlots<Tag extends 'button' | 'a'> = ReturnType<
	__sveltets_Render<Tag>['slots']
>;
export default class Component<Tag extends 'button' | 'a'> extends SvelteComponent<
	ComponentProps<Tag>,
	ComponentEvents<Tag>,
	ComponentSlots<Tag>
> {}
export {};
