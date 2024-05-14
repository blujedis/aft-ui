import { SvelteComponent } from "svelte";
import { type TabsProps, type TabsStore } from './module';
declare const __propDef: {
    props: {
        context?: {
            globals: Partial<Omit<{
                focused: boolean;
                full: boolean;
                hovered: boolean;
                rounded: import("../../types").ThemeRounded;
                size: import("../../types").ThemeSize;
                theme: import("../../types").ThemeColor;
                transitioned: boolean;
                variant: import("../..").TabVariant;
                underlined: boolean;
            }, "rounded" | "hovered" | "full" | "transitioned" | "focused" | "size" | "theme" | "variant" | "underlined">>;
            set(this: void, value: TabsStore): void;
            update(this: void, updater: import("svelte/store").Updater<TabsStore>): void;
            subscribe(this: void, run: import("svelte/store").Subscriber<TabsStore>, invalidate?: import("svelte/store").Invalidator<TabsStore> | undefined): import("svelte/store").Unsubscriber;
        } | undefined;
    } & TabsProps & import("svelte/elements").HTMLAttributes<HTMLUListElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
    get context(): {
        globals: Partial<Omit<{
            focused: boolean;
            full: boolean;
            hovered: boolean;
            rounded: import("../../types").ThemeRounded;
            size: import("../../types").ThemeSize;
            theme: import("../../types").ThemeColor;
            transitioned: boolean;
            variant: import("../..").TabVariant;
            underlined: boolean;
        }, "rounded" | "hovered" | "full" | "transitioned" | "focused" | "size" | "theme" | "variant" | "underlined">>;
        set(this: void, value: TabsStore): void;
        update(this: void, updater: import("svelte/store").Updater<TabsStore>): void;
        subscribe(this: void, run: import("svelte/store").Subscriber<TabsStore>, invalidate?: import("svelte/store").Invalidator<TabsStore> | undefined): import("svelte/store").Unsubscriber;
    };
}
export {};
