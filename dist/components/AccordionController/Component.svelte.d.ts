import { SvelteComponentTyped } from "svelte";
import type { HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): Omit<import("../..").AccordianOptionProps, "as" | "variant" | "value"> & {
        as?: Tag | undefined;
        full?: boolean | undefined;
        multiple?: boolean | undefined;
        selected?: import("../..").SelectValue[] | undefined;
        rounded?: import("../..").ThemeRounded | undefined;
        shadowed?: import("../..").ThemeShadowed | undefined;
        variant?: "default" | "outlined" | "flushed" | "pills" | undefined;
    } & import("../..").ElementProps<Tag> & {
        store?: import("../..").SelectStore<{
            multiple: boolean;
            selected: import("../..").SelectValue[];
        }> | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            select: (value?: import("../..").SelectValue | undefined) => void;
            unselect: (value?: import("../..").SelectValue | undefined) => void;
            reset: any;
            isSelected: (value?: import("../..").SelectValue | undefined) => boolean;
            selectedItems: import("../..").SelectValue[];
        };
    };
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponentTyped<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
    get store(): import("svelte/store").Writable<import("../..").SelectProps & {
        multiple: boolean;
        selected: import("../..").SelectValue[];
    }> & import("../..").SelectMethods;
}
export {};
