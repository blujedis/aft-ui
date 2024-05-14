import { SvelteComponent } from "svelte";
import type { ElementProps, HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): {
        store?: import("../../stores/select").SelectStore<{
            mode: "multiple";
            selected: any[];
        }> | undefined;
    } & Omit<import("../..").AccordianOptionProps, "key" | "selected" | "as" | "variant" | "value"> & {
        as?: Tag | undefined;
        focused?: boolean | undefined;
        hovered?: boolean | undefined;
        multiple?: boolean | undefined;
        selected?: any[] | undefined;
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
            select: (value?: any) => void;
            unselect: (value?: any) => void;
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
