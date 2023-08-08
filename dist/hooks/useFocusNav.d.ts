type FindActive = (items: HTMLElement[]) => HTMLElement | null | undefined;
type HandleEnter = (node: HTMLElement) => void;
export declare function useFocusNav(root?: HTMLElement | ChildNode | null): {
    getChildren: () => HTMLElement[];
    focusRoot: () => void;
    onSelected: (fn: HandleEnter) => void;
    onFindActive: (fn: FindActive) => void;
    onKeydown: (e: KeyboardEvent, preventDefault?: boolean) => void;
};
export {};
