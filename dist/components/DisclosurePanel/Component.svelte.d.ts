import { SvelteComponent } from "svelte";
import type { HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): {
        [name: string]: any;
    } & {
        as?: keyof import("svelte/elements").SvelteHTMLElements | undefined;
        focustrap?: boolean | undefined;
        unmount?: boolean | undefined;
    } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
}
export {};
