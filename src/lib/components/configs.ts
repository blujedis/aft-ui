import {
	variantBorder,
	variantBorderHover,
	variantBorderHoverGroup,
	variantFilled,
	variantActive,
	variantFilledHover,
	variantFlushed,
	variantFlushedHover,
	variantGhost,
	variantGhostHover,
	variantOutlined,
	variantOutlinedHover,
	variantPanel,
	variantText,
	variantTextHover,
	variantItemCurrent,
	variantItemExpanded,
	variantItemSelected,
	variantItemHover,
	variantItemChecked,
	variantTextExpanded,
	variantBorderExpanded,
	variantItemCheckedGhost,
	variantItemCheckedFilled,
	variantOutlinedHoverless
} from '$lib/constants/variants';

export const globals = {
	text: { ...variantText },
	textHover: { ...variantTextHover },
	textExpanded: { ...variantTextExpanded },
	filledActive: { ...variantActive },
	filled: { ...variantFilled },
	filledHover: { ...variantFilledHover },
	outlined: { ...variantOutlined },
	outlinedHover: { ...variantOutlinedHover },
	outlinedHoverless: { ...variantOutlinedHoverless },
	bordered: { ...variantBorder },
	borderedHover: { ...variantBorderHover },
	borderedHoverGroup: { ...variantBorderHoverGroup },
	borderExpanded: { ...variantBorderExpanded },
	ghost: { ...variantGhost },
	ghostHover: { ...variantGhostHover },
	flushed: { ...variantFlushed },
	flushedHover: { ...variantFlushedHover },
	panel: { ...variantPanel },
	itemHover: { ...variantItemHover },
	itemCurrent: { ...variantItemCurrent },
	itemSelected: { ...variantItemSelected },
	itemExpanded: { ...variantItemExpanded },
	itemChecked: { ...variantItemChecked },
	itemCheckedGhost: { ...variantItemCheckedGhost },
	itemCheckedFilled: { ...variantItemCheckedFilled },
};

export * from './BreadcrumbOption/config';
export * from './ButtonGroupItem/config';
export * from './DataGrid/config';
export * from './DataGridFilter/config';
export * from './DataGridHeader/config';
export * from './DataGridRow/config';
export * from './DataGridSearch/config';
export * from './Notifications/config';
export * from './Notification/config';
export * from './PaginationDetail/config';
export * from './PaginationPage/config';
export * from './ProgressBar/config';
export * from './ProgressCircle/config';
export * from './Range/config';
export * from './SelectListOption/config';
export * from './Switch/config';
export * from './DataGrid/config';
export * from './Tab/config';
export * from './Tabs/config';

