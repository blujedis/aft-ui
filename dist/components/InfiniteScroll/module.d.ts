export type InfiniteScrollProps = {
    threshold?: number;
    horizontal?: boolean;
    element?: HTMLElement | null;
    hasMore?: boolean | number;
    reverse?: boolean;
    window?: boolean;
};
export declare const infiniteScrollDefaults: Partial<InfiniteScrollProps>;
