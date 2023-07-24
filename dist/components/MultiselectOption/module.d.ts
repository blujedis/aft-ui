import type { ThemeColor, ThemeSize } from '../../types';
import type { MultiselectItemKey } from '../MultiselectController';
import type { multiselectOption } from './config';
export type MultiselectOptionVariant = keyof typeof multiselectOption;
export type MultiselectOptionProps<Tag extends 'a' | 'button'> = {
    as?: Tag;
    size?: ThemeSize;
    theme?: ThemeColor;
    key?: MultiselectItemKey;
    variant?: MultiselectOptionVariant;
};
export declare const multiselectOptionDefaults: MultiselectOptionProps<'a'>;
