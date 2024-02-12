import type { SelectStore, SelectStoreValue } from '$lib/stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { SelectListVariant, SelectListButtonProps } from '../SelectListButton';
import type { BadgeProps, BadgeVariant } from '../Badge/module';

export type SelectListItemKey = SelectStoreValue;

export type SelectListItem = {
	label?: string;
	value: SelectListItemKey;
	group?: string | number;
	selected?: boolean;
};

export type SelectListStore<T extends SelectListItem = SelectListItem> = {
	visible?: boolean;
	items: T[];
	filtered: T[];
	input?: HTMLInputElement;
	panel?: HTMLDivElement;
};

export type SelectListContext<T extends SelectListItem = SelectListItem> =
	SelectStore<SelectListStore> & {
		open(): void;
		close(): void;
		toggle(): void;
		isSelected(key: SelectListItemKey): boolean;
		isSelected(item: T): boolean;
		add({ value, label, group, selected }: T): void;
		remove(key: SelectListItemKey): void;
		remove(item: T): void;
		filter(query?: string): void;
		reset(selectedItems?: SelectListItemKey[]): void;
		globals: SelectListContextProps;
	};

export type SelectListContextProps = {
	badgeProps?: BadgeProps;
	disabled?: boolean;
	filterable?: boolean
	full?: boolean;
	focused?: boolean;
	hovered?: boolean;
	multiple?: boolean; // when not tags allows multiple items to be selected.
	newable?: boolean;			// can add new tags
	placeholder?: string;
	removable?: boolean;		// can remote tags
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	tags?: boolean;				// tags enabled.
	theme?: ThemeColor;
	badgeVariant?: BadgeVariant;
	variant?: SelectListVariant;
	onBeforeAdd?: SelectListButtonProps['onBeforeAdd'];
	onBeforeRemove?: SelectListButtonProps['onBeforeRemove'];
};

export type SelectListProps<T extends SelectListItem> = SelectListContextProps & {
	autoclose?: boolean; // on click outside menu close.
	escapable?: boolean; // close panel on escape key.
	items: T[]; // | Promise<T[]>;
	store?: SelectStore<SelectListStore>; // custom store.
	visible?: boolean;
	filter?: (query: string, items: Required<T>[]) => Required<T>[]; // filter used to find items in list.
};

export const selectListDefaults: Partial<SelectListProps<SelectListItem> & SelectListContextProps> =
{
	autoclose: true,
	escapable: true,
	filterable: true,
	filter: (q, i) =>
		i.filter(
			(v) => v.label.includes(q) || (v.value + '').includes(q) || (v.group + '')?.includes(q)
		),
	size: 'md',
	theme: 'frame',
	variant: 'outlined'
};
