import { SvelteComponent } from "svelte";
import type { ElementProps, HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): {
        store?: import("../../stores/select").SelectStore<{
            multiple: boolean;
            selected: import("../../stores/select").SelectStoreValue[];
        }> | undefined;
    } & Omit<import("../..").AccordianOptionProps, "key" | "selected" | "as" | "variant" | "value"> & {
        as?: Tag | undefined;
        focused?: boolean | undefined;
        hovered?: boolean | undefined;
        multiple?: boolean | undefined;
        selected?: import("../../stores/select").SelectStoreValue[] | undefined;
        selectable?: boolean | undefined;
        rounded?: import("../../types").ThemeRounded | undefined;
        shadowed?: import("../../types").ThemeShadowed | undefined;
        transitioned?: boolean | undefined;
        variant?: import("../..").AccordionVariant | undefined;
    } & ElementProps<Tag>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            select: (value?: import("../../stores/select").SelectStoreValue) => void;
            unselect: (value?: import("../../stores/select").SelectStoreValue) => void;
            reset: () => void;
            isSelected: (value?: import("../../stores/select").SelectStoreValue) => boolean;
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
