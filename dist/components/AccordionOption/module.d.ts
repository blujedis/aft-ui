import type { SelectStoreValue } from '../../stores/select';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { accordionOption } from './config';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure/module';
export type AccordianOptionVariant = keyof typeof accordionOption;
export type AccordianOptionProps<Tag = any> = {
    as?: Tag;
    key?: SelectStoreValue;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
    variant?: AccordianOptionVariant;
};
export declare const accordionOptionDefaults: Partial<AccordianOptionProps<'div'>>;
