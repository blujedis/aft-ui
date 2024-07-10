import type { SelectStore, SelectStoreValue } from '$lib/stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { SelectListVariant, SelectListButtonProps } from '../SelectListButton';
import type { BadgeProps } from '../Badge/module';

export type SelectListItemKey = SelectStoreValue;
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

export type SelectListContext<T extends SelectListItem = SelectListItem> = Omit<
	SelectStore<SelectListStore>,
	'select' | 'toggle' | 'restore'
> & {
	open(): void;
	close(): void;
	toggle(): void;
	isSelected(key: SelectListItemKey): boolean;
	isSelected(item: T): boolean;
	add({ value, label, group, selected }: T): void;
	select(key: SelectListItemKey): void;
	select(item: T): void;
	remove(key: SelectListItemKey): void;
	remove(item: T): void;
	restore(restoreInput?: boolean): void;
	restore(
		selectedItems: SelectListItemKey | SelectListItemKey[],
		restoreInput?: boolean,
		force?: boolean
	): void;
	filter(query?: string): void;
	globals: SelectListContextProps;
};

export type SelectListContextProps = {
	badgeProps?: BadgeProps;
	disabled?: boolean;
	exclusive?: boolean;
	filterable?: boolean;
	full?: boolean;
	focused?: boolean;
	hovered?: boolean;
	tags?: boolean; // multiple tags mode.
	tagsTheme?: ThemeColor;
	min?: number; // min tags required.
	max?: number; // max tags allowed.
	name?: string; // name of the inner element.
	newable?: boolean; // can add new tags
	placeholder?: string;
	recordless?: boolean | string; // display no records panel when filtered is empty.
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
	value?: any;
	visible?: boolean;
	filter?: FilterQuery<T>; // filter used to find items in list.
	onChange?: (values: SelectStoreValue | SelectStoreValue[]) => any;
};

export const selectListDefaults: Partial<SelectListProps<SelectListItem> & SelectListContextProps> =
	{
		autoclose: true,
		escapable: true,
		filterable: false,
		filter: (q, i) =>
			i.filter(
				(v) => v.label.includes(q) || (v.value + '').includes(q) || (v.group + '')?.includes(q)
			),
		recordless: true,
		size: 'md',
		theme: 'frame',
		value: '',
		variant: 'outlined'
	};
