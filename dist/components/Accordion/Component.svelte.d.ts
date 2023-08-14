import { SvelteComponent } from "svelte";
import type { HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): Omit<import("..").AccordianOptionProps, "variant" | "value" | "as"> & {
        as?: Tag | undefined;
        multiple?: boolean | undefined;
        selected?: import("../../stores/select").SelectStoreValue[] | undefined;
        rounded?: import("../../types").ThemeRounded | undefined;
        shadowed?: import("../../types").ThemeShadowed | undefined;
        variant?: "flushed" | "filled" | "outlined" | "glass" | undefined;
    } & import("../../types").ElementProps<Tag> & {
        store?: import("../../stores/select").SelectStore<{
            multiple: boolean;
            selected: import("../../stores/select").SelectStoreValue[];
        }> | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            select: (value?: import("../../stores/select").SelectStoreValue | undefined) => void;
            unselect: (value?: import("../../stores/select").SelectStoreValue | undefined) => void;
            reset: () => void;
            isSelected: (value?: import("../../stores/select").SelectStoreValue | undefined) => boolean;
            selectedItems: import("../../stores/select").SelectStoreValue[];
        };
    };
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
    get store(): import("svelte/store").Writable<import("../../stores/select").SelectStoreOptions & {
        multiple: boolean;
        selected: import("../../stores/select").SelectStoreValue[];
    }> & import("../../stores/select").SelectStoreMethods;
}
export {};
