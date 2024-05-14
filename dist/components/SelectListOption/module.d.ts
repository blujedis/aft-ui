import type { ThemeColor, ThemeSize } from '../../types';
import type { SelectListItemKey } from '../SelectList';
export type SelectListOptionProps<Tag extends 'a' | 'button'> = {
    activeStyles?: boolean;
    as?: Tag;
    focused?: boolean;
    hovered?: boolean;
    tags?: boolean;
    removable?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor;
    key?: SelectListItemKey;
};
export declare const selectListOptionDefaults: SelectListOptionProps<'a'>;
