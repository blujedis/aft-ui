export type ConditionalRenderProps = {
    condition: boolean | ((...args: any[]) => boolean);
};
export declare const conditionalRenderDefaults: Partial<ConditionalRenderProps>;
