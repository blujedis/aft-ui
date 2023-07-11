export type ConditionalElementProps<Tag> = {
    events?: boolean;
    as?: Tag;
    condition: boolean | ((...args: any[]) => boolean);
};
export declare const conditionalElementDefaults: Partial<ConditionalElementProps<'div'>>;
