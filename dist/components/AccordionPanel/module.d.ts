import type { SelectStoreValue } from '../../stores/select';
import type { HTMLTag } from '../../types';
export type AccordionPanelContext = {
    key: SelectStoreValue;
};
export type AccordionPanelProps<Tag extends HTMLTag> = {
    as?: Tag;
    key: SelectStoreValue;
};
export declare const accordionPanelDefaults: Partial<AccordionPanelProps<'div'>>;
