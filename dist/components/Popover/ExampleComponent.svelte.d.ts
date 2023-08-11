import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        close?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ExampleComponentProps = typeof __propDef.props;
export type ExampleComponentEvents = typeof __propDef.events;
export type ExampleComponentSlots = typeof __propDef.slots;
export default class ExampleComponent extends SvelteComponent<ExampleComponentProps, ExampleComponentEvents, ExampleComponentSlots> {
}
export {};
