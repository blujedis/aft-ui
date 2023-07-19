import type { SelectStore, SelectValue } from '$lib/stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { multiselectController } from './config';
import type { MultiselectButtonVariant } from '../MultiselectButton';

export type MultiselectControllerVariant = keyof typeof multiselectController;

export type MultiselectItemKey = SelectValue;

export type MultiselectItem =  {
	label?: string;
  value: MultiselectItemKey;
	group?: string | number;
  selected?: boolean;
};

export type MultiselectControllerStore<T extends MultiselectItem = MultiselectItem> = {
	visible?: boolean;
	items: T[];
	filtered: T[];
};

export type MultiselectControllerGlobalProps = {
	full?: boolean;
	multiple?: boolean;
	strategy?: 'button' | 'text';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	underlined?: boolean;
	variant?: MultiselectButtonVariant;
};

export type MultiselectControllerContext = SelectStore<MultiselectControllerStore> & {
	open(): void;
	close(): void;
	toggle(): void;
	isSelected(key: MultiselectItemKey): boolean;
	isSelected<T extends MultiselectItem>(item: T): boolean;
	add<T extends MultiselectItem>({ value, label, group, selected }: T): void;
	remove(key: MultiselectItemKey): void;
	remove<T extends MultiselectItem>(item: T): void;
	filter(query?: string): void;
	reset(selectedItems: MultiselectItemKey[]): void;
	globals: MultiselectControllerGlobalProps;
};

export type MultiselectControllerProps<T extends MultiselectItem> = MultiselectControllerGlobalProps & {
	autoclose?: boolean; // on click outside menu close.
	escapable?: boolean; // close panel on escape key.
	items: T[];
	store?: SelectStore<MultiselectControllerStore>;
	visible?: boolean;
	filter?: (query: string, items: Required<T>[]) => Required<T>[];
};

export const multiselectControllerDefaults: Partial<MultiselectControllerProps<MultiselectItem> & MultiselectControllerGlobalProps> = {
	autoclose: true,
	escapable: true,
	filter: (q, i) =>
		i.filter((v) => v.label.includes(q) || (v.value + '').includes(q) || (v.group + '')?.includes(q)),
	size: 'md',
	strategy: 'button',
	theme: 'default',
	variant: 'default'
};
