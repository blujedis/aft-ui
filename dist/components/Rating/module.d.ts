/// <reference types="node" />
/// <reference types="svelte" />
import type { ThemeShadowed } from '../../types';
import type { Writable } from 'svelte/store';
import type { RatingItemProps } from '../RatingItem/module';
type OmittedRatingProps = 'index';
export type RatingStoreValue = {
    active: number;
    readonly: boolean;
    score: number;
    selected: number;
};
export type RatingContext = Writable<RatingStoreValue> & {
    globals: Omit<RatingItemProps, OmittedRatingProps>;
    events: {
        handleCleanup: (e: Event) => void;
    };
};
export type RatingProps = Omit<RatingItemProps, OmittedRatingProps> & {
    arrowable?: boolean;
    hoverable?: boolean;
    count?: number;
    readonly?: boolean;
    shadowed?: ThemeShadowed;
    score?: number;
    updatable?: boolean;
};
export declare const ratingControllerDefaults: RatingProps;
export {};
