import { SvelteComponent } from "svelte";
import type { ElementProps, HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): {
        store?: import("../../stores/select").SelectStore<{
            mode: "multiple";
            selected: any[];
        }> | undefined;
    } & Omit<import("..").AccordianOptionProps, "key" | "selected" | "as" | "variant" | "value"> & {
        as?: Tag | undefined;
        focused?: boolean;
        hovered?: boolean;
        multiple?: boolean;
        selected?: import("../../stores/select").SelectStoreValue[];
        selectable?: boolean;
        rounded?: import("../../types").ThemeRounded;
        shadowed?: import("../../types").ThemeShadowed;
        transitioned?: boolean;
        variant?: import("..").AccordionVariant;
    } & ElementProps<Tag>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            select: (value?: import("../../stores/select").SelectStoreValue) => void;
            unselect: (value?: import("../../stores/select").SelectStoreValue) => void;
            reset: () => void;
            selectedItems: any;
        };
    };
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
    get store(): import("svelte/store").Writable<import("../../stores/select").SelectStoreOptions & {
        mode: "multiple";
        selected: any[];
    }> & import("../../stores/select").SelectStoreMethods;
}
export {};
