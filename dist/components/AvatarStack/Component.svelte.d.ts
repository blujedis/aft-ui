import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        context?: {
            globals: {
                stacked: string;
            };
        };
    } & Partial<import("..").AvatarProps> & {
        direction?: "up" | "down";
    } & Omit<import("svelte/elements").HTMLAttributes<HTMLSpanElement>, "size">;
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
        globals: {
            stacked: string;
        };
    };
}
export {};
