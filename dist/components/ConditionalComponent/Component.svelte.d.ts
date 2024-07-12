import { SvelteComponent } from "svelte";
import { type ConditionalComponentProps } from './module';
declare class __sveltets_Render<Tag extends typeof SvelteComponent<any>> {
    props(): ConditionalComponentProps<Tag> & import("svelte").ComponentProps<InstanceType<Tag>>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ComponentProps<Tag extends typeof SvelteComponent<any>> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends typeof SvelteComponent<any>> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends typeof SvelteComponent<any>> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends typeof SvelteComponent<any>> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
}
export {};
