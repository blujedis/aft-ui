import { SvelteComponent } from "svelte";
import type { ElementProps } from '../../types';
declare class __sveltets_Render<Tag extends 'div' | 'a'> {
    props(): Pick<import("../../hooks/usePopover").PopoverOptions, "events" | "middleware" | "placement" | "strategy" | "offset" | "padding" | "sticky" | "escapeable"> & {
        arrowed?: boolean | undefined;
        as?: Tag | undefined;
        escapeable?: boolean | undefined;
        events?: import("../../hooks/usePopover").PopoverEvent | import("../../hooks/usePopover").PopoverEvent[] | undefined;
        role?: import("svelte/elements").AriaRole | null | undefined;
        rounded?: import("../../types").ThemeRounded | undefined;
        shadowed?: import("../../types").ThemeShadowed | undefined;
        size?: import("../../types").ThemeSize | undefined;
        theme?: import("../../types").ThemeColor | undefined;
        transitioned?: boolean | undefined;
        trigger?: string | undefined;
        variant?: import("./module").TooltipVariant | undefined;
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
