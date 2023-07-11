import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../theme';
import type { progressBar } from './config';
export type ProgressBarVariant = keyof typeof progressBar;
export type ProgressBarTweenedOptions<T extends number = any> = {
    delay?: number;
    duration?: number | ((from: T, to: T) => number);
    easing?: (t: number) => number;
    interpolate?: (a: T, b: T) => (t: number) => T;
};
export type ProgressBarProps<T extends number = any> = ProgressBarTweenedOptions<T> & {
    animate?: boolean;
    full?: boolean;
    max?: number;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    value?: T;
    variant?: ProgressBarVariant;
};
export declare const progressBarDefaults: ProgressBarProps<any>;
