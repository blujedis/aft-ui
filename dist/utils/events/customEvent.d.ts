/**
 * Custom events require declaring the custom event names
 * in your app.d.ts file.
 *
 * @example
 * declare namespace svelte.JSX {
 *	interface HTMLAttributes<T> {
 *		onclick_outside: (e: any) => void;
 *	}
 * }
 */
export type ElementEvent<T extends HTMLElement> = Event & {
    currentTarget: EventTarget & T;
    target: EventTarget & T;
    contains: (other: Node | null) => boolean;
    dispatchEvent: (event: any) => void;
    preventDefault: boolean;
};
export type CustomEventDetail<T = any> = Record<string, any> & {
    detail: T | null | undefined;
};
export type BeforeDispatchHandler<T = any> = <E extends HTMLElement>(e: ElementEvent<E>, node: HTMLElement) => boolean | CustomEventDetail<T>;
export declare function createCustomEvent<T, K extends keyof DocumentEventMap>(event: K, name: string, beforeDispatch?: BeforeDispatchHandler<T>): <E extends HTMLElement>(node: E) => {
    destroy(): void;
};
