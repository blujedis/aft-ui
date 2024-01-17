import { SvelteComponent } from "svelte";
import { type PaginationProps } from './module';
declare class __sveltets_Render<Item extends Record<string, any>> {
    props(): {
        context?: {
            globals: Partial<{
                rounded: import("../../types").ThemeRounded;
                shadowed: import("../../types").ThemeShadowed;
                size: import("../../types").ThemeSize;
                theme: "default" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info";
                transitioned: boolean;
                variant: "flushed" | "filled" | "ghost";
            }>;
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
        globals: Partial<{
            rounded: import("../../types").ThemeRounded;
            shadowed: import("../../types").ThemeShadowed;
            size: import("../../types").ThemeSize;
            theme: "default" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info";
            transitioned: boolean;
            variant: "flushed" | "filled" | "ghost";
        }>;
    };
}
export {};
