import type { SelectValue } from '../../stores/select';
import type { HTMLTag } from '../../types';
export type AccordionPanelContext = {
    name: SelectValue;
};
export type AccordionPanelProps<Tag extends HTMLTag> = {
    as?: Tag;
    name: SelectValue;
};
export declare const accordionPanelDefaults: Partial<AccordionPanelProps<'div'>>;
