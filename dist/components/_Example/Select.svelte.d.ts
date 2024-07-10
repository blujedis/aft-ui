import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        label?: string;
        value?: any;
        placeholder?: string | false | null;
        items?: (string | {
            label: string;
            value: string | number;
        })[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SelectProps = typeof __propDef.props;
export type SelectEvents = typeof __propDef.events;
export type SelectSlots = typeof __propDef.slots;
export default class Select extends SvelteComponent<SelectProps, SelectEvents, SelectSlots> {
}
export {};
