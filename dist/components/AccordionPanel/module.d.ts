import type { SelectValue } from '../../stores/select';
import type { HTMLTag } from '../../types';
export type AccordionPanelContext = {
    key: SelectValue;
};
export type AccordionPanelProps<Tag extends HTMLTag> = {
    as?: Tag;
    key: SelectValue;
};
export declare const accordionPanelDefaults: Partial<AccordionPanelProps<'div'>>;
