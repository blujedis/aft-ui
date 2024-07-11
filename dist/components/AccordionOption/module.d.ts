import type { SelectStoreValue } from '../../stores/select';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { AccordionVariant } from '..';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure/module';
export type AccordionOptionContext = {
    key: SelectStoreValue;
};
export type AccordianOptionProps<Tag = any> = {
    as?: Tag;
    bordered?: boolean;
    detached?: boolean | string;
    focused?: boolean;
    key: SelectStoreValue;
    rounded?: ThemeRounded;
    selected?: boolean;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
    variant?: AccordionVariant;
};
export declare const accordionOptionDefaults: Partial<AccordianOptionProps<'div'>>;
