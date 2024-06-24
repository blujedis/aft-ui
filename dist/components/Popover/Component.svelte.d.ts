import { SvelteComponent } from "svelte";
import type { ElementProps } from '../../types';
declare class __sveltets_Render<Tag extends 'div' | 'a'> {
    props(): Partial<Pick<import("../../hooks/usePopover").PopoverOptions, "events" | "middleware" | "placement" | "strategy" | "offset" | "padding" | "sticky" | "escapeable">> & {
        as?: Tag | undefined;
        role?: import("svelte/elements").AriaRole | null | undefined;
        trigger?: string | undefined;
        onChange?: ((state: boolean) => any) | undefined;
    } & Omit<ElementProps<Tag>, "size">;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ComponentProps<Tag extends 'div' | 'a'> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends 'div' | 'a'> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends 'div' | 'a'> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends 'div' | 'a'> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
}
export {};
