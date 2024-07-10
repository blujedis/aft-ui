import { SvelteComponent } from "svelte";
import type { ThemeColor, ThemeSize } from '../../types';
declare const __propDef: {
    props: {
        state?: 0 | 1 | -1;
        theme?: ThemeColor;
        stroke?: boolean;
        size?: ThemeSize;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SortIconProps = typeof __propDef.props;
export type SortIconEvents = typeof __propDef.events;
export type SortIconSlots = typeof __propDef.slots;
export default class SortIcon extends SvelteComponent<SortIconProps, SortIconEvents, SortIconSlots> {
}
export {};
