import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        color?: string | undefined;
        label?: "" | "top" | "bottom" | "contained" | undefined;
        size?: number | undefined;
        swatches?: boolean | undefined;
        format?: "rgb" | "hex" | undefined;
        onChange: (value: string, info: {
            brightness: number;
            format: 'hex' | 'rgb';
            swatches: string[];
        }) => void;
        update?: ((value: string) => void) | undefined;
        reset?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponentTyped<ComponentProps, ComponentEvents, ComponentSlots> {
    get update(): (value: string) => void;
    get reset(): () => void;
}
export {};
