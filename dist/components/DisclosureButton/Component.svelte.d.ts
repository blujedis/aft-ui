import { SvelteComponent } from "svelte";
import type { HTMLTag } from '../../types';
declare class __sveltets_Render<T extends HTMLTag | typeof SvelteComponent> {
    props(): {
        as?: T | undefined;
    } & (T extends typeof SvelteComponent ? import("svelte").ComponentProps<InstanceType<T>> : T extends keyof import("svelte/elements").SvelteHTMLElements ? import("../../types").ElementProps<T> : never);
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ComponentProps<T extends HTMLTag | typeof SvelteComponent> = ReturnType<__sveltets_Render<T>['props']>;
export type ComponentEvents<T extends HTMLTag | typeof SvelteComponent> = ReturnType<__sveltets_Render<T>['events']>;
export type ComponentSlots<T extends HTMLTag | typeof SvelteComponent> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Component<T extends HTMLTag | typeof SvelteComponent> extends SvelteComponent<ComponentProps<T>, ComponentEvents<T>, ComponentSlots<T>> {
}
export {};
