import type { ButtonProps } from '../Button/module';
import type { buttonGroupItem } from './config';

export type ButtonGroupVariant = keyof typeof buttonGroupItem;

export type ButtonGroupItemProps = Omit<ButtonProps<'button' | 'a'>, 'shadowed'> & {
	value: string | number;
};

export const buttonGroupItemDefaults: Partial<ButtonGroupItemProps> = {
	theme: 'default',
	variant: 'filled'
};
