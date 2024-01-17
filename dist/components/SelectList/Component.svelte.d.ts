import { SvelteComponent } from "svelte";
import { type SelectListContext, type SelectListStore, type SelectListItem } from './module';
import { type SelectStore } from '../..';
declare class __sveltets_Render<Item extends SelectListItem> {
    props(): {
        store?: SelectStore<SelectListStore<Item>> | undefined;
        api?: {
            open: () => void;
            close: () => void;
            isSelected: (itemOrKey: import("../..").SelectStoreValue | Item) => boolean;
            add: ({ value, label, group, selected }: Item) => void;
            toggle: () => void;
            remove: (itemOrKey: import("../..").SelectStoreValue | Item) => void;
            filter: (query?: string | undefined) => void;
            reset: (selectedItems?: import("../..").SelectStoreValue[]) => void;
        } | undefined;
        context?: SelectListContext | undefined;
    } & import("../..").SelectListContextProps & {
        autoclose?: boolean | undefined;
        escapable?: boolean | undefined;
        items: Item[] | Promise<Item[]>;
        store?: SelectStore<SelectListStore<SelectListItem>> | undefined;
        visible?: boolean | undefined;
        filter?: ((query: string, items: Required<Item>[]) => Required<Item>[]) | undefined;
    } & Omit<import("svelte/elements").HTMLSelectAttributes, "size">;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            visible: boolean | undefined;
            selected: import("../..").SelectStoreValue[];
            filtered: Item[];
            isSelected: ((value?: import("../..").SelectStoreValue | undefined) => boolean) & {
                (key: import("../..").SelectStoreValue): boolean;
                (item: SelectListItem): boolean;
            };
            open: () => void;
            close: () => void;
            toggle: (value?: import("../..").SelectStoreValue | undefined) => void;
        };
        select: {};
    };
}
export type ComponentProps<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['props']>;
export type ComponentEvents<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['events']>;
export type ComponentSlots<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['slots']>;
export default class Component<Item extends SelectListItem> extends SvelteComponent<ComponentProps<Item>, ComponentEvents<Item>, ComponentSlots<Item>> {
    get store(): import("svelte/store").Writable<import("../..").SelectStoreOptions & SelectListStore<Item>> & import("../..").SelectStoreMethods & import("svelte/store").Writable<import("../..").SelectStoreOptions & SelectListStore<SelectListItem>>;
    get api(): {
        open: () => void;
        close: () => void;
        isSelected: (itemOrKey: import("../..").SelectStoreValue | Item) => boolean;
        add: ({ value, label, group, selected }: Item) => void;
        toggle: () => void;
        remove: (itemOrKey: import("../..").SelectStoreValue | Item) => void;
        filter: (query?: string | undefined) => void;
        reset: (selectedItems?: import("../..").SelectStoreValue[]) => void;
    };
    get context(): import("svelte/store").Writable<import("../..").SelectStoreOptions & SelectListStore<SelectListItem>> & import("../..").SelectStoreMethods & {
        open(): void;
        close(): void;
        toggle(): void;
        isSelected(key: import("../..").SelectStoreValue): boolean;
        isSelected(item: SelectListItem): boolean;
        add({ value, label, group, selected }: SelectListItem): void;
        remove(key: import("../..").SelectStoreValue): void;
        remove(item: SelectListItem): void;
        filter(query?: string | undefined): void;
        reset(selectedItems?: import("../..").SelectStoreValue[] | undefined): void;
        globals: import("../..").SelectListContextProps;
    };
}
export {};
