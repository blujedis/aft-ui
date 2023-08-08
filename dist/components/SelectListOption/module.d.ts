import type { ThemeColor, ThemeSize } from '../../types';
import type { SelectListItemKey } from '../SelectList';
import type { selectListOption } from './config';
export type SelectListOptionVariant = keyof typeof selectListOption;
export type SelectListOptionProps<Tag extends 'a' | 'button'> = {
    as?: Tag;
    size?: ThemeSize;
    theme?: ThemeColor;
    key?: SelectListItemKey;
    variant?: SelectListOptionVariant;
};
export declare const selectListOptionDefaults: SelectListOptionProps<'a'>;
