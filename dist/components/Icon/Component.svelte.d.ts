import { SvelteComponent } from "svelte";
/**
     * This is just a wrapper class because Iconify IconProps is missing
     * the property class. You can see the documentation at
     * @see https://docs.iconify.design/icon-components/svelte/dimensions.html#:~:text=%22cil%3Atruck%22-,class,-%3D%22big%2Dicon
     */
import { type IconProps } from './module';
declare const __propDef: {
    props: IconProps;
    events: {
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
