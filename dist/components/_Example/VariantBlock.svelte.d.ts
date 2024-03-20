import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type VariantBlockProps = typeof __propDef.props;
export type VariantBlockEvents = typeof __propDef.events;
export type VariantBlockSlots = typeof __propDef.slots;
export default class VariantBlock extends SvelteComponent<VariantBlockProps, VariantBlockEvents, VariantBlockSlots> {
}
export {};
