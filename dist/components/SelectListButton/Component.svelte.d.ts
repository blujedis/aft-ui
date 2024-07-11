import { SvelteComponent } from "svelte";
import { type SelectListItem } from '..';
declare const __propDef: {
    props: import("..").InputProps & {
        badgeProps?: import("..").BadgeProps;
        caret?: string | import("@iconify/svelte").IconifyIcon;
        filterable?: boolean;
        hovered?: boolean;
        tags?: boolean;
        tagsTheme?: import("../../types").ThemeColor;
        newable?: boolean;
        placeholder?: string;
        removable?: boolean;
        roticon?: boolean;
        variant?: import("..").SelectListVariant;
        onBeforeAdd?: <T extends SelectListItem>(value: string, input: HTMLInputElement) => T | null | false | undefined | Promise<T | null | false | undefined>;
        onBeforeRemove?: <T extends SelectListItem>(item: T, input: HTMLInputElement) => boolean | Promise<boolean>;
    } & import("svelte/elements").HTMLInputAttributes;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        tags: {
            removeTag: (item?: SelectListItem) => Promise<boolean | undefined>;
        };
        icon: {};
        input: {
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
