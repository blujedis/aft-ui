import { SvelteComponent } from "svelte";
import { type PaginationProps } from './module';
declare class __sveltets_Render<Item extends Record<string, any>> {
    props(): {
        context?: {
            globals: Partial<Omit<{
                focused: boolean;
                hovered: boolean;
                rounded: import("../../types").ThemeRounded;
                size: import("../../types").ThemeSize;
                theme: import("../../types").ThemeColor;
                transitioned: boolean;
                variant: import("./module").PaginationVariant;
            }, "rounded" | "hovered" | "transitioned" | "focused" | "size" | "theme" | "variant">>;
            set(this: void, value: import("../../hooks/usePaginator").Paginator<any>): void;
            update(this: void, updater: import("svelte/store").Updater<import("../../hooks/usePaginator").Paginator<any>>): void;
            subscribe(this: void, run: import("svelte/store").Subscriber<import("../../hooks/usePaginator").Paginator<any>>, invalidate?: import("svelte/store").Invalidator<import("../../hooks/usePaginator").Paginator<any>> | undefined): import("svelte/store").Unsubscriber;
        } | undefined;
    } & PaginationProps<Item> & import("svelte/elements").HTMLAttributes<HTMLElement>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            current: number;
            startPage: number;
            endPage: number;
            rangeStart: number;
            rangeEnd: number;
            activePages: (string | number)[];
            totalPages: number;
        };
    };
}
export type ComponentProps<Item extends Record<string, any>> = ReturnType<__sveltets_Render<Item>['props']>;
export type ComponentEvents<Item extends Record<string, any>> = ReturnType<__sveltets_Render<Item>['events']>;
export type ComponentSlots<Item extends Record<string, any>> = ReturnType<__sveltets_Render<Item>['slots']>;
export default class Component<Item extends Record<string, any>> extends SvelteComponent<ComponentProps<Item>, ComponentEvents<Item>, ComponentSlots<Item>> {
    get context(): {
        globals: Partial<Omit<{
            focused: boolean;
            hovered: boolean;
            rounded: import("../../types").ThemeRounded;
            size: import("../../types").ThemeSize;
            theme: import("../../types").ThemeColor;
            transitioned: boolean;
            variant: import("./module").PaginationVariant;
        }, "rounded" | "hovered" | "transitioned" | "focused" | "size" | "theme" | "variant">>;
        set(this: void, value: import("../../hooks/usePaginator").Paginator<any>): void;
        update(this: void, updater: import("svelte/store").Updater<import("../../hooks/usePaginator").Paginator<any>>): void;
        subscribe(this: void, run: import("svelte/store").Subscriber<import("../../hooks/usePaginator").Paginator<any>>, invalidate?: import("svelte/store").Invalidator<import("../../hooks/usePaginator").Paginator<any>> | undefined): import("svelte/store").Unsubscriber;
    };
}
export {};
