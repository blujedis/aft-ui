import { SvelteComponent } from "svelte";
import type { ThemeRounded } from '../../types';
declare const __propDef: {
    props: {
        onChange?: ((data: Record<string, any>) => void) | undefined;
        rounded?: ThemeRounded | undefined;
        queryValueOne: string;
        queryAndOr?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type FilterPopoverProps = typeof __propDef.props;
export type FilterPopoverEvents = typeof __propDef.events;
export type FilterPopoverSlots = typeof __propDef.slots;
export default class FilterPopover extends SvelteComponent<FilterPopoverProps, FilterPopoverEvents, FilterPopoverSlots> {
}
export {};
