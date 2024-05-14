import { SvelteComponent } from "svelte";
import { type SelectListItem } from './module';
declare class __sveltets_Render<Item extends SelectListItem> {
    props(): {
        isSelected?: ((itemOrKey: any) => any) | undefined;
        setLabel?: ((itemOrKey?: any) => void) | undefined;
        open?: (() => void) | undefined;
        close?: (() => void) | undefined;
        toggle?: (() => void) | undefined;
        add?: (({ value, label, group, selected }: Item) => void) | undefined;
        select?: ((itemOrKey: any) => void) | undefined;
        remove?: ((itemOrKey: any) => void) | undefined;
        filter?: ((query?: string | undefined) => Promise<void>) | undefined;
    } & import("../..").SelectListContextProps & {
        autoclose?: boolean | undefined;
        escapable?: boolean | undefined;
        items: Item[];
        value?: any;
        visible?: boolean | undefined;
        filter?: import("../..").FilterQuery<Item> | undefined;
        onChange?: ((values: any) => any) | undefined;
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
            open: () => void;
            close: () => void;
            toggle: (value?: any) => void;
            select: (value?: any) => void;
        };
        select: {};
    };
}
export type ComponentProps<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['props']>;
export type ComponentEvents<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['events']>;
export type ComponentSlots<Item extends SelectListItem> = ReturnType<__sveltets_Render<Item>['slots']>;
export default class Component<Item extends SelectListItem> extends SvelteComponent<ComponentProps<Item>, ComponentEvents<Item>, ComponentSlots<Item>> {
    get isSelected(): (itemOrKey: any) => any;
    get setLabel(): (itemOrKey?: any) => void;
    get open(): () => void;
    get close(): () => void;
    get toggle(): () => void;
    get add(): ({ value, label, group, selected }: Item) => void;
    get select(): (itemOrKey: any) => void;
    get remove(): (itemOrKey: any) => void;
    get filter(): ((query?: string | undefined) => Promise<void>) & import("../..").FilterQuery<Item>;
}
export {};
