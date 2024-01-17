import { SvelteComponent } from "svelte";
import { type ConditionalElementProps } from './module';
import type { ElementProps, HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag | typeof SvelteComponent<any, any>> {
    props(): ConditionalElementProps<Tag> & (Tag extends keyof import("svelte/elements").SvelteHTMLElements ? ElementProps<Tag> : Tag extends typeof SvelteComponent<any, any> ? {
        props?: import("svelte").ComponentProps<InstanceType<Tag>> | undefined;
    } : never);
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ComponentProps<Tag extends HTMLTag | typeof SvelteComponent<any, any>> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag | typeof SvelteComponent<any, any>> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag | typeof SvelteComponent<any, any>> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag | typeof SvelteComponent<any, any>> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
}
export {};
