import type { Readable } from 'svelte/store';
import { type VirtualElement, type ComputePositionConfig, type Middleware } from '@floating-ui/dom';
export type PopoverComputeMiddleware = false | null | undefined | Middleware;
export type PopoverEvent = 'hover' | 'click' | 'focus';
export type PopoverEventTuple = [keyof HTMLElementEventMap, (...args: any[]) => void];
export type PopoverOptions = ComputePositionConfig & {
    sticky?: boolean;
    containerRef?: string | HTMLElement | null | undefined;
    escapeable?: boolean;
    events?: PopoverEvent | PopoverEvent[] | null;
    offset?: number;
    padding?: number;
    onChange?: (visible: boolean) => any;
};
export type PopoverContentOptions = ComputePositionConfig & {
    arrowRef?: string | HTMLElement | null | undefined;
    offset?: PopoverOptions['offset'];
    padding?: PopoverOptions['padding'];
};
export declare function createPopoverInstance(instanceOptions?: PopoverOptions): {
    getConfig: (updateOptions?: Partial<PopoverOptions>) => ComputePositionConfig;
    bindEvents: () => void;
    unbindEvents: () => void;
    open: () => void;
    close: () => void;
    compute: () => void;
    registerTrigger: (node: string | HTMLElement | VirtualElement | Readable<VirtualElement>) => {
        destroy?: undefined;
    } | {
        destroy: () => void;
    };
    registerContent: (node: HTMLElement, registerOptions?: PopoverContentOptions) => {
        update(updateConfig: Partial<ComputePositionConfig>): void;
        destroy: () => void;
    };
    destroy: () => void;
};
