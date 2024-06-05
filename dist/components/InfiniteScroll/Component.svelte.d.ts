import { SvelteComponent } from "svelte";
import { type InfiniteScrollProps } from './module';
declare const __propDef: {
    props: InfiniteScrollProps;
    events: {
        load: CustomEvent<undefined>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
