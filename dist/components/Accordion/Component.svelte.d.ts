import { SvelteComponentTyped } from "svelte";
import type { HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): Omit<import("../..").AccordianOptionProps, "variant" | "as" | "value"> & {
        as?: Tag | undefined;
        full?: boolean | undefined;
        multiple?: boolean | undefined;
        selected?: import("../../stores/select").SelectValue[] | undefined;
        rounded?: import("../..").ThemeRounded | undefined;
        shadowed?: import("../..").ThemeShadowed | undefined;
        variant?: "default" | "outlined" | "flushed" | "pills" | undefined;
    } & import("../..").ElementProps<Tag> & {
        store?: import("../../stores/select").SelectStore<{
            multiple: boolean;
            selected: import("../../stores/select").SelectValue[];
        }> | undefined;
        class?: import("../..").ClassArgument | import("../..").ClassArgument[];
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            select: (value?: import("../../stores/select").SelectValue | undefined) => void;
            unselect: (value?: import("../../stores/select").SelectValue | undefined) => void;
            reset: (...selected: import("../../stores/select").SelectValue[]) => void;
            isSelected: (value?: import("../../stores/select").SelectValue | undefined) => void;
            selectedItems: import("../../stores/select").SelectValue[];
        };
    };
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponentTyped<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
    get store(): import("svelte/store").Writable<import("../../stores/select").SelectProps & {
        multiple: boolean;
        selected: import("../../stores/select").SelectValue[];
    }> & import("../../stores/select").SelectMethods;
}
export {};
