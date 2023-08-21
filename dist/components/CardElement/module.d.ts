import type { ThemeColor, ThemeSize, ThemeVariant } from '../../types';
export type CardElementVariant = Exclude<ThemeVariant, 'text' | 'flushed'>;
export type CardElementProps = {
    horizontal?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor;
    type?: 'content' | 'header' | 'footer';
    variant?: CardElementVariant;
};
export declare const cardElementDefaults: Partial<CardElementProps>;
