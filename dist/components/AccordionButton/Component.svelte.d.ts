import { SvelteComponent } from "svelte";
import type { ElementProps, HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): Omit<import("../..").ButtonProps<"button">, "rounded" | "full" | "focused" | "shadowed" | "as" | "variant" | "href" | "underlined"> & {
        as?: Tag | undefined;
        caret?: import("../../types").Iconify | undefined;
        roticon?: string | boolean | undefined;
        rotiangle?: 90 | 180 | undefined;
        selectable?: boolean | undefined;
        key?: any;
        theme?: import("../../types").ThemeColor | undefined;
        variant?: import("./module").AccordionVariant | undefined;
    } & ElementProps<Tag>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
        caret: {};
    };
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
}
export {};
