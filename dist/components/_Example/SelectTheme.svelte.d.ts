import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SelectThemeProps = typeof __propDef.props;
export type SelectThemeEvents = typeof __propDef.events;
export type SelectThemeSlots = typeof __propDef.slots;
export default class SelectTheme extends SvelteComponentTyped<SelectThemeProps, SelectThemeEvents, SelectThemeSlots> {
}
export {};
