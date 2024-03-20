type FindHandler<T extends HTMLElement> = (items: T[], e: KeyboardEvent) => T;
type SelectedHandler<T extends HTMLElement> = (el: T, e: KeyboardEvent) => any;
type InitHandler<T extends HTMLElement> = (items: T[]) => void;
type NavigateHandler<T extends HTMLElement> = (item: T | undefined, index: number) => any;
export interface FocusNavOptions<T extends HTMLElement> {
    selectedClass?: string;
    allowedClass?: string;
    onFind?: FindHandler<T>;
    onSelected?: SelectedHandler<T>;
    onNavigate?: NavigateHandler<T>;
    onInit?: InitHandler<T>;
}
export declare function useFocusNav<T extends HTMLElement>(root?: HTMLElement | ChildNode | null, options?: FocusNavOptions<T>): {
    getItems: () => T[];
    focusRoot: () => void;
    onKeydown: (e: KeyboardEvent, preventDefault?: boolean) => void;
};
export {};
