import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type GenerateProps = typeof __propDef.props;
export type GenerateEvents = typeof __propDef.events;
export type GenerateSlots = typeof __propDef.slots;
export default class Generate extends SvelteComponent<GenerateProps, GenerateEvents, GenerateSlots> {
}
export {};
