import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type VariantOptionProps = typeof __propDef.props;
export type VariantOptionEvents = typeof __propDef.events;
export type VariantOptionSlots = typeof __propDef.slots;
export default class VariantOption extends SvelteComponent<VariantOptionProps, VariantOptionEvents, VariantOptionSlots> {
}
export {};
