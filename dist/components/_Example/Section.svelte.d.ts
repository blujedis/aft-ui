import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: import("svelte/elements").HTMLAttributes<HTMLDivElement> & Record<string, any>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SectionProps = typeof __propDef.props;
export type SectionEvents = typeof __propDef.events;
export type SectionSlots = typeof __propDef.slots;
export default class Section extends SvelteComponent<SectionProps, SectionEvents, SectionSlots> {
}
export {};
