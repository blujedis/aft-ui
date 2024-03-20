import { SvelteComponent } from "svelte";
import { type SelectListContext, type SelectListStore, type SelectListItem } from './module';
import { type SelectStore } from '../..';
declare class __sveltets_Render<Item extends SelectListItem> {
    props(): {
        store?: SelectStore<SelectListStore<Item>> | undefined;
        context?: SelectListContext | undefined;
    } & import("../..").SelectListContextProps & {
        autoclose?: boolean | undefined;
        escapable?: boolean | undefined;
        items: Item[];
        store?: SelectStore<SelectListStore<SelectListItem>> | undefined;
        value?: any;
        visible?: boolean | undefined;
        filter?: import("../..").FilterQuery<Item> | undefined;
    } & Omit<import("svelte/elements").HTMLSelectAttributes, "size">;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            visible: boolean | undefined;
            selectedItems: import("../..").SelectStoreValue[];
            filtered: Item[];
            filtering: boolean | undefined;
            isSelected: ((value?: import("../..").SelectStoreValue) => boolean) & {
                (key: import("../..").SelectStoreValue): boolean;
                (item: SelectListItem): boolean;
            };
            open: () => void;
            close: () => void;
            toggle: (value?: import("../..").SelectStoreValue) => void;
        };
        select: {};
    };
}
export type ComponentProps<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['props']>;
export type ComponentEvents<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['events']>;
export type ComponentSlots<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['slots']>;
export default class Component<Item extends SelectListItem> extends SvelteComponent<ComponentProps<Item>, ComponentEvents<Item>, ComponentSlots<Item>> {
    get store(): import("svelte/store").Writable<import("../..").SelectStoreOptions & SelectListStore<Item>> & import("../..").SelectStoreMethods & import("svelte/store").Writable<import("../..").SelectStoreOptions & SelectListStore<SelectListItem>>;
    get context(): import("svelte/store").Writable<import("../..").SelectStoreOptions & SelectListStore<SelectListItem>> & import("../..").SelectStoreMethods & {
        open(): void;
        close(): void;
        toggle(): void;
        isSelected(key: import("../..").SelectStoreValue): boolean;
        isSelected(item: SelectListItem): boolean;
        add({ value, label, group, selected }: SelectListItem): void;
        remove(key: import("../..").SelectStoreValue): void;
        remove(item: SelectListItem): void;
        restoreSelected(restoreInput?: boolean | undefined): void;
        restoreSelected(selectedItems: import("../..").SelectStoreValue | import("../..").SelectStoreValue[], restoreInput?: boolean | undefined): void;
        filter(query?: string | undefined): void;
        globals: import("../..").SelectListContextProps;
    };
}
export {};
