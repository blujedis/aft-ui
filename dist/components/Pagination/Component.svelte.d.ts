import { SvelteComponent } from "svelte";
import { type PaginationProps } from './module';
declare class __sveltets_Render<Item extends Record<string, any>> {
    props(): {
        context?: {
            globals: Omit<Partial<{
                focused: boolean;
                hovered: boolean;
                rounded: import("../../types").ThemeRounded;
                size: import("../../types").ThemeSize;
                theme: import("../../types").ThemeColor;
                transitioned: boolean;
                variant: import("./module").PaginationVariant;
            }>, "rounded" | "hovered" | "focused" | "size" | "theme" | "transitioned" | "variant">;
            set(this: void, value: import("../../stores/paginator").Paginator<Record<string, any>>): void;
            update: ((this: void, updater: import("svelte/store").Updater<import("../../stores/paginator").Paginator<Record<string, any>>>) => void) & ((options: import("../../stores/paginator").PaginatorOptions<Record<string, any>>) => void);
            subscribe(this: void, run: import("svelte/store").Subscriber<import("../../stores/paginator").Paginator<Record<string, any>>>, invalidate?: import("svelte/store").Invalidator<import("../../stores/paginator").Paginator<Record<string, any>>> | undefined): import("svelte/store").Unsubscriber;
            getRange(items?: Record<string, any>[] | undefined): Record<string, any>[] | null;
            hasPage(page: string | number): boolean;
            hasPrev(): boolean;
            hasNext(): boolean;
            goto(page: string | number): void;
            prev(): void;
            next(): void;
            reset(options?: import("../../stores/paginator").PaginatorOptions<Record<string, any>> | undefined): void;
        } | undefined;
    } & PaginationProps<Item> & import("svelte/elements").HTMLAttributes<HTMLElement>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            page: number;
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
        globals: Omit<Partial<{
            focused: boolean;
            hovered: boolean;
            rounded: import("../../types").ThemeRounded;
            size: import("../../types").ThemeSize;
            theme: import("../../types").ThemeColor;
            transitioned: boolean;
            variant: import("./module").PaginationVariant;
        }>, "rounded" | "hovered" | "focused" | "size" | "theme" | "transitioned" | "variant">;
        set(this: void, value: import("../../stores/paginator").Paginator<Record<string, any>>): void;
        update: ((this: void, updater: import("svelte/store").Updater<import("../../stores/paginator").Paginator<Record<string, any>>>) => void) & ((options: import("../../stores/paginator").PaginatorOptions<Record<string, any>>) => void);
        subscribe(this: void, run: import("svelte/store").Subscriber<import("../../stores/paginator").Paginator<Record<string, any>>>, invalidate?: import("svelte/store").Invalidator<import("../../stores/paginator").Paginator<Record<string, any>>> | undefined): import("svelte/store").Unsubscriber;
        getRange(items?: Record<string, any>[] | undefined): Record<string, any>[] | null;
        hasPage(page: string | number): boolean;
        hasPrev(): boolean;
        hasNext(): boolean;
        goto(page: string | number): void;
        prev(): void;
        next(): void;
        reset(options?: import("../../stores/paginator").PaginatorOptions<Record<string, any>> | undefined): void;
    };
}
export {};
