import { SvelteComponentTyped } from "svelte";
import { type TabProps } from './module';
import type { ElementProps } from '../../types';
declare class __sveltets_Render<Tag extends 'a' | 'button'> {
    props(): TabProps<Tag> & ElementProps<Tag>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ComponentProps<Tag extends 'a' | 'button'> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends 'a' | 'button'> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends 'a' | 'button'> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends 'a' | 'button'> extends SvelteComponentTyped<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
}
export {};
