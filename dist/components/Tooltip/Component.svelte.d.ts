import { SvelteComponent } from "svelte";
import type { ElementProps } from '../../types';
declare class __sveltets_Render<Tag extends 'div' | 'a'> {
    props(): Pick<import("../../hooks/usePopover").PopoverOptions, "events" | "middleware" | "placement" | "strategy" | "offset" | "padding" | "sticky" | "escapeable"> & {
        arrowed?: boolean;
        as?: Tag | undefined;
        escapeable?: boolean;
        events?: import("../../hooks/usePopover").PopoverEvent | import("../../hooks/usePopover").PopoverEvent[];
        role?: import("svelte/elements").AriaRole | null | undefined;
        rounded?: import("../../types").ThemeRounded;
        shadowed?: import("../../types").ThemeShadowed;
        size?: import("../../types").ThemeSize;
        theme?: import("../../types").ThemeColor;
        transitioned?: boolean;
        trigger?: string;
        variant?: import("./module").TooltipVariant;
        onChange?: (state: boolean) => any;
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
