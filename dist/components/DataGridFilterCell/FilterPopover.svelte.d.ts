import { SvelteComponent } from "svelte";
import type { ThemeRounded } from '../../types';
import type { DataGridFilterListItem } from '../DataGrid/filter';
declare const __propDef: {
    props: {
        rounded?: ThemeRounded | undefined;
        filters?: DataGridFilterListItem[] | undefined;
        data?: {
            criteriaOne: string;
            valueOne: string;
            criteriaTwo: string;
            valueTwo: string;
            join: "and" | "or";
        } | undefined;
        applyFilter?: (() => void) | undefined;
        resetFilter?: (() => void) | undefined;
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
