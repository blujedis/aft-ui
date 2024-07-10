import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SelectTransitionProps = typeof __propDef.props;
export type SelectTransitionEvents = typeof __propDef.events;
export type SelectTransitionSlots = typeof __propDef.slots;
export default class SelectTransition extends SvelteComponent<SelectTransitionProps, SelectTransitionEvents, SelectTransitionSlots> {
}
export {};
