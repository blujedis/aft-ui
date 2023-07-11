export declare const defaultFocusables: string[];
export type FocusTrapHook = (node: HTMLElement) => {
    destroy: () => void;
};
export type FocusTrapHandler = (event: KeyboardEvent) => void;
export type FocusTrapOptions = {
    enabled?: boolean;
    focusables?: string[];
    child?: string;
};
export declare function useFocusTrap(enabled?: boolean): [FocusTrapHook, FocusTrapHandler];
export declare function useFocusTrap(options?: FocusTrapOptions): [FocusTrapHook, FocusTrapHandler];
export default useFocusTrap;
