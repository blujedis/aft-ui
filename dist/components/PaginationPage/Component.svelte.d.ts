import { SvelteComponent } from "svelte";
import type { HTMLAnchorAttributes, HTMLBaseAttributes, HTMLButtonAttributes } from 'svelte/elements';
import { type PaginationPageProps } from './module';
declare class __sveltets_Render<Tag extends 'a' | 'button' | 'span'> {
    props(): PaginationPageProps<Tag> & (Tag extends "button" ? HTMLButtonAttributes : Tag extends "a" ? HTMLAnchorAttributes : HTMLBaseAttributes);
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ComponentProps<Tag extends 'a' | 'button' | 'span'> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends 'a' | 'button' | 'span'> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends 'a' | 'button' | 'span'> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends 'a' | 'button' | 'span'> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
}
export {};
