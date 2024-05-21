import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string | undefined;
        label?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SelectSizeProps = typeof __propDef.props;
export type SelectSizeEvents = typeof __propDef.events;
export type SelectSizeSlots = typeof __propDef.slots;
export default class SelectSize extends SvelteComponent<SelectSizeProps, SelectSizeEvents, SelectSizeSlots> {
}
export {};
