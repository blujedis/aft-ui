import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { CardVariant } from '../CardElement';
export type CardContext = {
    globals: {
        size?: ThemeSize;
        theme?: ThemeColor;
        horizontal?: boolean;
        variant?: CardVariant;
    };
};
export type CardProps = {
    divided?: boolean;
    full?: boolean;
    horizontal?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    variant?: CardVariant;
    maxwidth?: ThemeSize;
};
export declare const cardDefaults: Partial<CardProps>;
