import type { ButtonProps } from '../Button/module';
export type ButtonGroupVariant = 'flushed' | 'filled' | 'outlined' | 'ghost' | 'soft';
export type ButtonGroupItemProps = Omit<ButtonProps<'button' | 'a'>, 'shadowed' | 'variant'> & {
    value: string | number;
    variant?: ButtonGroupVariant;
};
export declare const buttonGroupItemDefaults: Partial<ButtonGroupItemProps>;
