import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        store?: import("../../stores/select").SelectStore<{
            selected: (string | number | bigint | boolean | HTMLElement | Date | null | undefined)[];
            multiple: boolean;
        }> | undefined;
    } & Omit<import("../..").ButtonProps<"a" | "button">, "disabled" | "variant"> & {
        multiple?: boolean | undefined;
        selected?: import("../../stores/select").SelectStoreValue | import("../../stores/select").SelectStoreValue[];
        variant?: import("../..").ButtonGroupVariant | undefined;
    } & Omit<import("svelte/elements").HTMLAttributes<HTMLSpanElement>, "size">;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            selectedItems: import("../../stores/select").SelectStoreValue[] & (string | number | bigint | boolean | HTMLElement | Date | null | undefined)[];
            reset: () => void;
            select: (value?: import("../../stores/select").SelectStoreValue) => void;
            unselect: (value?: import("../../stores/select").SelectStoreValue) => void;
            isSelected: (value?: import("../../stores/select").SelectStoreValue) => boolean;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
    get store(): import("svelte/store").Writable<import("../../stores/select").SelectStoreOptions & {
        selected: (string | number | bigint | boolean | HTMLElement | Date | null | undefined)[];
        multiple: boolean;
    }> & import("../../stores/select").SelectStoreMethods;
}
export {};
