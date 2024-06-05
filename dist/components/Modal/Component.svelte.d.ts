import { SvelteComponent } from "svelte";
import { type ModalProps } from './module';
declare const __propDef: {
    props: ModalProps;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        backdrop: {};
        default: {};
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
