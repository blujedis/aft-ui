import { SvelteComponentTyped } from "svelte";
import type { HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): Omit<import("../..").AccordianOptionProps, "as" | "variant" | "value"> & {
        as?: Tag | undefined;
        multiple?: boolean | undefined;
        selected?: import("../..").SelectStoreValue[] | undefined;
        rounded?: import("../..").ThemeRounded | undefined;
        shadowed?: import("../..").ThemeShadowed | undefined;
        variant?: "default" | "outlined" | "flushed" | "pills" | undefined;
    } & import("../..").ElementProps<Tag> & {
        store?: import("../..").SelectStore<{
            multiple: boolean;
            selected: import("../..").SelectStoreValue[];
        }> | undefined;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            select: (value?: import("../..").SelectStoreValue | undefined) => void;
            unselect: (value?: import("../..").SelectStoreValue | undefined) => void;
            reset: () => void;
            isSelected: (value?: import("../..").SelectStoreValue | undefined) => boolean;
            selectedItems: import("../..").SelectStoreValue[];
        };
    };
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponentTyped<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
    get store(): import("svelte/store").Writable<import("../..").SelectStoreOptions & {
        multiple: boolean;
        selected: import("../..").SelectStoreValue[];
    }> & import("../..").SelectStoreMethods;
}
export {};
