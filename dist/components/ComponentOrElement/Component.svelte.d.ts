import { SvelteComponentTyped } from "svelte";
import type { SvelteComponent } from 'svelte';
import type { HTMLTag } from '../../types';
declare class __sveltets_Render<T extends HTMLTag | typeof SvelteComponent<any>> {
    props(): {
        as: T;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ComponentProps<T extends HTMLTag | typeof SvelteComponent<any>> = ReturnType<__sveltets_Render<T>['props']>;
export type ComponentEvents<T extends HTMLTag | typeof SvelteComponent<any>> = ReturnType<__sveltets_Render<T>['events']>;
export type ComponentSlots<T extends HTMLTag | typeof SvelteComponent<any>> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Component<T extends HTMLTag | typeof SvelteComponent<any>> extends SvelteComponentTyped<ComponentProps<T>, ComponentEvents<T>, ComponentSlots<T>> {
}
export {};
