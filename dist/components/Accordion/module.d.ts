import type { SelectStore, SelectStoreValue } from '../../stores/select';
import type { accordion } from './config';
import type { AccordianOptionProps } from '../AccordionOption';
import type { HTMLTag, ThemeRounded, ThemeShadowed } from '../../types';
export type AccordianVariant = keyof typeof accordion;
export type AccordionContext = SelectStore & {
    globals: Omit<AccordianOptionProps, 'as'> & {
        rounded: ThemeRounded;
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
