import type { SelectStore } from '$lib/stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { SelectListVariant, SelectListButtonProps } from '../SelectListButton';
import type { BadgeProps } from '../Badge/module';

export type SelectListItemKey = string | number;
export type FilterQuery<T = SelectListItem> = (
	query: string,
	items: Required<T>[],
	selected: SelectListItemKey[]
) => Required<T>[] | Promise<Required<T>[]>;

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
	persisted: SelectListItemKey[];
	filtering?: boolean;
	input?: HTMLInputElement;
	panel?: HTMLDivElement;
	trigger?: HTMLDivElement;
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
		restoreSelected(restoreInput?: boolean): void;
		restoreSelected(
			selectedItems: SelectListItemKey | SelectListItemKey[],
			restoreInput?: boolean
		): void;
		filter(query?: string): void;
		globals: SelectListContextProps;
	};

export type SelectListContextProps = {
	badgeProps?: BadgeProps;
	disabled?: boolean;
	filterable?: boolean;
	full?: boolean;
	focused?: boolean;
	hovered?: boolean;
	multiple?: boolean; // multiple tags mode.
	newable?: boolean; // can add new tags
	placeholder?: string;
	removable?: boolean; // can remote tags
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	variant?: SelectListVariant;
	transitioned?: boolean;
	onBeforeAdd?: SelectListButtonProps['onBeforeAdd'];
	onBeforeRemove?: SelectListButtonProps['onBeforeRemove'];
};

export type SelectListProps<T extends SelectListItem> = SelectListContextProps & {
	autoclose?: boolean; // on click outside menu close.
	escapable?: boolean; // close panel on escape key.
	items: T[]; // | Promise<T[]>;
	store?: SelectStore<SelectListStore>; // custom store.
	visible?: boolean;
	filter?: FilterQuery<T>; // filter used to find items in list.
};

export const selectListDefaults: Partial<SelectListProps<SelectListItem> & SelectListContextProps> =
	{
		autoclose: true,
		escapable: true,
		filter: (q, i) =>
			i.filter(
				(v) => v.label.includes(q) || (v.value + '').includes(q) || (v.group + '')?.includes(q)
			),
		size: 'md',
		theme: 'frame',
		variant: 'outlined'
	};
