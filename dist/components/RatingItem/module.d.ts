import type { ThemeColorKey, ThemeSize } from '../../types';
export type RatingItemProps = {
    background?: string;
    fill?: ThemeColorKey;
    index: number;
    size?: ThemeSize;
    stroked?: boolean;
};
export declare const ratingDefaults: Partial<RatingItemProps>;
