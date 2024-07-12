import type { ThemeColor, ThemeSize } from '../../types';
export type CardVariant = 'text' | 'filled' | 'outlined' | 'soft';
export type CardElementProps = {
    horizontal?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor;
    type?: 'content' | 'header' | 'footer';
    variant?: CardVariant;
};
export declare const cardElementDefaults: Partial<CardElementProps>;
