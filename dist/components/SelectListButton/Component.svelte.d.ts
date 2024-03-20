import { SvelteComponent } from "svelte";
import { type SelectListItem } from '..';
declare const __propDef: {
    props: import("..").InputProps & {
        badgeProps?: import("..").BadgeProps | undefined;
        caret?: string | import("@iconify/svelte").IconifyIcon | undefined;
        filterable?: boolean | undefined;
        hovered?: boolean | undefined;
        multiple?: boolean | undefined;
        newable?: boolean | undefined;
        placeholder?: string | undefined;
        removable?: boolean | undefined;
        roticon?: boolean | undefined;
        variant?: import("..").SelectListVariant | undefined;
        onBeforeAdd?: (<T extends SelectListItem>(value: string, input: HTMLInputElement) => false | T | Promise<false | T | null | undefined> | null | undefined) | undefined;
        onBeforeRemove?: (<T_1 extends SelectListItem>(item: T_1, input: HTMLInputElement) => boolean | Promise<boolean>) | undefined;
    } & import("svelte/elements").HTMLInputAttributes;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        tags: {
            handleRemoveTag: (item?: SelectListItem) => Promise<boolean | undefined>;
        };
        icon: {};
        input: {
            handleInputUpdate: (e: Event & {
                currentTarget: EventTarget | HTMLInputElement;
            }) => void;
            handleInputKeydown: (e: {
                currentTarget: EventTarget & HTMLInputElement;
            } & KeyboardEvent) => Promise<void>;
            handleInputClick: (e: MouseEvent & {
                currentTarget: EventTarget | HTMLInputElement;
            }) => void;
        };
        caret: {
            handleCaretClick: (e: MouseEvent) => void;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
