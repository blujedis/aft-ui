import type { ButtonProps } from '../Button/module';
import type { buttonGroupItem } from './config';
export type ButtonGroupItemVariant = keyof typeof buttonGroupItem;
export type ButtonGroupItemProps = Omit<ButtonProps<'button' | 'a'>, 'shadowed'> & {
	value: string | number;
};
export declare const buttonGroupItemDefaults: Partial<ButtonGroupItemProps>;
