import { SvelteComponent } from "svelte";
import { type SelectListItem, type SelectListItemKey } from './module';
declare class __sveltets_Render<Item extends SelectListItem> {
    props(): {
        isSelected?: ((itemOrKey: Item | SelectListItemKey) => any) | undefined;
        setLabel?: ((itemOrKey?: Item | SelectListItemKey) => void) | undefined;
        open?: (() => void) | undefined;
        close?: (() => void) | undefined;
        toggle?: (() => void) | undefined;
        add?: (({ value, label, group, selected }: Item) => void) | undefined;
        select?: ((itemOrKey: Item | SelectListItemKey) => Promise<void>) | undefined;
        remove?: ((itemOrKey: Item | SelectListItemKey) => Promise<void>) | undefined;
        filter?: ((query?: string) => Promise<void>) | undefined;
    } & import("../..").SelectListContextProps & {
        autoclose?: boolean;
        escapable?: boolean;
        items: Item[];
        value?: any;
        visible?: boolean;
        filter?: import("../..").FilterQuery<Item> | undefined;
        onChange?: (values: import("../..").SelectStoreValue | import("../..").SelectStoreValue[]) => any;
    } & Omit<import("svelte/elements").HTMLSelectAttributes, "size" | "multiple">;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            visible: boolean | undefined;
            selectedItems: any;
            filtered: Item[];
            filtering: boolean | undefined;
            groups: Record<string, Required<Item>[]>;
            open: () => void;
            close: () => void;
            toggle: (value?: import("../..").SelectStoreValue) => void;
            select: (value?: import("../..").SelectStoreValue) => void;
        };
        select: {};
    };
}
export type ComponentProps<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['props']>;
export type ComponentEvents<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['events']>;
export type ComponentSlots<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['slots']>;
export default class Component<Item extends SelectListItem> extends SvelteComponent<ComponentProps<Item>, ComponentEvents<Item>, ComponentSlots<Item>> {
    get isSelected(): (itemOrKey: Item | SelectListItemKey) => any;
    get setLabel(): (itemOrKey?: Item | SelectListItemKey) => void;
    get open(): () => void;
    get close(): () => void;
    get toggle(): () => void;
    get add(): ({ value, label, group, selected }: Item) => void;
    get select(): (itemOrKey: Item | SelectListItemKey) => Promise<void>;
    get remove(): (itemOrKey: Item | SelectListItemKey) => Promise<void>;
    get filter(): ((query?: string) => Promise<void>) & import("../..").FilterQuery<Item>;
}
export {};
