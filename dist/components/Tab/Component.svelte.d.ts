import { SvelteComponentTyped } from 'svelte';
import { type TabProps } from './module';
import type { ElementNativeProps } from '../types';
declare class __sveltets_Render<Tag extends 'a' | 'button'> {
	props(): TabProps<Tag> &
		(Tag extends 'button'
			? ElementNativeProps<'button', 'value' | 'disabled'>
			: ElementNativeProps<'a'>);
	events(): {} & {
		[evt: string]: CustomEvent<any>;
	};
	slots(): {
		default: {};
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
