import type { ThemeSize } from '../../types';
export type RatingItemProps = {
    background?: string;
    fill?: string;
    index: number;
    size?: ThemeSize;
    stroked?: boolean;
};
export declare const ratingDefaults: Partial<RatingItemProps>;
