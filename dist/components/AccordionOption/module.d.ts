import type { SelectValue } from '../../stores/select';
import type { ThemeColor, ThemeSize } from '../../theme';
import type { SlideParams } from 'svelte/transition';
import type { accordionOption } from './config';
export type AccordianOptionVariant = keyof typeof accordionOption;
export type AccordianOptionProps<Tag = any> = Omit<SlideParams, 'axis'> & {
    as?: Tag;
    name?: SelectValue;
    size?: ThemeSize;
    theme?: ThemeColor;
    variant?: AccordianOptionVariant;
};
export declare const accordionOptionDefaults: Partial<AccordianOptionProps<'div'>>;
