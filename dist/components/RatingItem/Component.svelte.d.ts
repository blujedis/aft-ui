import { SvelteComponent } from "svelte";
import { type RatingItemProps } from './module';
declare const __propDef: {
    props: RatingItemProps & import("svelte/elements").SVGAttributes<SVGSVGElement>;
    events: {
        mouseover: HTMLElementEventMap;
        mouseleave: HTMLElementEventMap;
        click: HTMLElementEventMap;
        focus: HTMLElementEventMap;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            stops: {
                offset: string;
                'stop-color': string;
                'stop-opacity': string;
            }[];
            uid: string;
            classes: string;
            styles: string;
            fill: string;
            stroke: string | undefined;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
