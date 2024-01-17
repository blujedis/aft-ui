import type { ThemeColor, ThemeSize } from '../../types';
import type { cardElement } from './config';
export type CardVariant = keyof typeof cardElement;
export type CardElementProps = {
    horizontal?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor;
    type?: 'content' | 'header' | 'footer';
    variant?: CardVariant;
};
export declare const cardElementDefaults: Partial<CardElementProps>;
