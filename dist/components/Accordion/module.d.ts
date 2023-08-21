import type { SelectStore, SelectStoreValue } from '../../stores/select';
import type { AccordianOptionProps } from '../AccordionOption';
import type { HTMLTag, ThemeRounded, ThemeShadowed, ThemeVariant } from '../../types';
export type AccordianVariant = Exclude<ThemeVariant, 'text'>;
export type AccordionContext = SelectStore & {
    globals: Omit<AccordianOptionProps, 'as'> & {
        rounded: ThemeRounded;
        variant: AccordianVariant;
    };
};
export type AccordionProps<Tag extends HTMLTag> = Omit<AccordianOptionProps, 'as' | 'value' | 'variant'> & {
    as?: Tag;
    multiple?: boolean;
    selected?: SelectStoreValue[];
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    variant?: AccordianVariant;
};
export declare const accordionDefaults: AccordionProps<'div'>;
