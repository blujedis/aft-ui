import { SvelteComponent } from "svelte";
import { type DisclosureProps } from './module';
import type { HTMLTag } from '../../types';
import { type DisclosureStore } from '../../stores';
declare class __sveltets_Render<Tag extends HTMLTag, Store extends DisclosureStore> {
    props(): {
        store?: Store | undefined;
    } & DisclosureProps<Store, keyof import("svelte/elements").SvelteHTMLElements> & {
        [name: string]: any;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            open: () => void;
            close: () => void;
            toggle: () => void;
            visible: boolean | undefined;
        };
    };
}
export type ComponentProps<Tag extends HTMLTag, Store extends DisclosureStore> = ReturnType<__sveltets_Render<Tag, Store>['props']>;
export type ComponentEvents<Tag extends HTMLTag, Store extends DisclosureStore> = ReturnType<__sveltets_Render<Tag, Store>['events']>;
export type ComponentSlots<Tag extends HTMLTag, Store extends DisclosureStore> = ReturnType<__sveltets_Render<Tag, Store>['slots']>;
export default class Component<Tag extends HTMLTag, Store extends DisclosureStore> extends SvelteComponent<ComponentProps<Tag, Store>, ComponentEvents<Tag, Store>, ComponentSlots<Tag, Store>> {
    get store(): Store & {};
}
export {};
