import { SvelteComponent } from "svelte";
import { type TabsProps, type TabsContext } from './module';
declare const __propDef: {
    props: {
        context?: TabsContext | undefined;
    } & TabsProps & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        mobile: {};
        tabs: {
            selectedItems: import("../../stores/select").SelectStoreValue[] & (string | number)[];
            reset: () => void;
            select: (value?: import("../../stores/select").SelectStoreValue | undefined) => void;
            unselect: (value?: import("../../stores/select").SelectStoreValue | undefined) => void;
            isSelected: (value?: import("../../stores/select").SelectStoreValue | undefined) => boolean;
        };
        panels: {
            selectedItems: import("../../stores/select").SelectStoreValue[] & (string | number)[];
            reset: () => void;
            select: (value?: import("../../stores/select").SelectStoreValue | undefined) => void;
            unselect: (value?: import("../../stores/select").SelectStoreValue | undefined) => void;
            isSelected: (value?: import("../../stores/select").SelectStoreValue | undefined) => boolean;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
    get context(): import("svelte/store").Writable<import("../../stores/select").SelectStoreOptions & Record<string, any>> & import("../../stores/select").SelectStoreMethods & {
        globals: {
            focused: import("../../types").ThemeFocused;
            full: boolean;
            rounded: import("../../types").ThemeRounded;
            size: import("../../types").ThemeSize;
            theme: "default" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info";
            transitioned: ThemeTransitioned;
            variant: "flushed" | "filled" | "grouped" | "labeled";
        };
    };
}
export {};
