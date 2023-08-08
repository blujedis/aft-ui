import type { ThemeColor, ThemeShadowed, ThemeSize } from '../../types';
import type { progressCircleTrack } from './config';
export type ProgressCircleVariant = keyof typeof progressCircleTrack;
export type ProgressCircleTweenedOptions<T extends number = any> = {
    delay?: number;
    duration?: number | ((from: T, to: T) => number);
    easing?: (t: number) => number;
    interpolate?: (a: T, b: T) => (t: number) => T;
};
export type ProgressCircleProps<T extends number = any> = ProgressCircleTweenedOptions<T> & {
    animate?: boolean;
    max?: number;
    shadowed?: ThemeShadowed;
    size?: ThemeSize | number;
    text?: boolean | string;
    textunit?: string;
    theme?: ThemeColor;
    tracksize?: ThemeSize | number;
    value?: T;
    variant?: ProgressCircleVariant;
};
export declare const progressCircleDefaults: ProgressCircleProps<any>;
