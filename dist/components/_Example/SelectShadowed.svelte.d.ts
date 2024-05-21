import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SelectShadowedProps = typeof __propDef.props;
export type SelectShadowedEvents = typeof __propDef.events;
export type SelectShadowedSlots = typeof __propDef.slots;
export default class SelectShadowed extends SvelteComponent<SelectShadowedProps, SelectShadowedEvents, SelectShadowedSlots> {
}
export {};
