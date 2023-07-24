import { SvelteComponentTyped } from "svelte";
import { type AccordionPanelProps } from './module';
import type { HTMLTag } from '../../types';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): AccordionPanelProps<Tag> & import("../..").ElementProps<Tag>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            open: () => void;
            close: () => void;
        };
    };
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponentTyped<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
}
export {};
