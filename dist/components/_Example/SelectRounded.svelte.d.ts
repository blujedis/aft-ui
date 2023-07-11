import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SelectRoundedProps = typeof __propDef.props;
export type SelectRoundedEvents = typeof __propDef.events;
export type SelectRoundedSlots = typeof __propDef.slots;
export default class SelectRounded extends SvelteComponentTyped<SelectRoundedProps, SelectRoundedEvents, SelectRoundedSlots> {
}
export {};
