import type { SelectStoreValue } from '../../stores/select';
import type { HTMLTag, ThemeColor, ThemeSize } from '../../types';
import type { AccordionVariant } from '../AccordionButton/module';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
export type AccordionContentProps<Tag extends HTMLTag> = {
    as?: Tag;
    key?: SelectStoreValue;
    size?: ThemeSize;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
    variant?: AccordionVariant;
};
export declare const accordionContentDefaults: Partial<AccordionContentProps<'div'>>;
