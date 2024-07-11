import type { HTMLTag } from '../../types';
export type ConditionalElementProps<T extends HTMLTag> = {
    as: T;
    condition: boolean | ((...args: any[]) => boolean);
};
export declare const conditionalElementDefaults: Partial<ConditionalElementProps<'div'>>;
