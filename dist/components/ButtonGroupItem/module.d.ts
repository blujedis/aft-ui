import type { ButtonProps } from '../Button/module';
import type { buttonGroupItem } from './config';
export type ButtonGroupVariant = keyof typeof buttonGroupItem;
export type ButtonGroupItemProps = Omit<ButtonProps<'button' | 'a'>, 'shadowed' | 'variant'> & {
    value: string | number;
    variant?: ButtonGroupVariant;
};
export declare const buttonGroupItemDefaults: Partial<ButtonGroupItemProps>;
