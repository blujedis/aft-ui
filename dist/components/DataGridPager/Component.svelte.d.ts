import { SvelteComponent } from "svelte";
declare class __sveltets_Render<Data extends DataGridDataItem, Tag extends 'a' | 'button' | 'span'> {
    props(): import("../..").PaginationProps<Data> & Pick<import("../..").PaginationPageProps<Tag>, "focused" | "as" | "next" | "previous"> & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type ComponentProps<Data extends DataGridDataItem, Tag extends 'a' | 'button' | 'span'> = ReturnType<__sveltets_Render<Data, Tag>['props']>;
export type ComponentEvents<Data extends DataGridDataItem, Tag extends 'a' | 'button' | 'span'> = ReturnType<__sveltets_Render<Data, Tag>['events']>;
export type ComponentSlots<Data extends DataGridDataItem, Tag extends 'a' | 'button' | 'span'> = ReturnType<__sveltets_Render<Data, Tag>['slots']>;
export default class Component<Data extends DataGridDataItem, Tag extends 'a' | 'button' | 'span'> extends SvelteComponent<ComponentProps<Data, Tag>, ComponentEvents<Data, Tag>, ComponentSlots<Data, Tag>> {
}
export {};
