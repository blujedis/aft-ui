import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ListOptionsProps = typeof __propDef.props;
export type ListOptionsEvents = typeof __propDef.events;
export type ListOptionsSlots = typeof __propDef.slots;
export default class ListOptions extends SvelteComponentTyped<ListOptionsProps, ListOptionsEvents, ListOptionsSlots> {
}
export {};
