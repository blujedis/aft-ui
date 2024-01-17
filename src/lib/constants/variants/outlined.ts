import { mergeConfigs } from '$lib/theme';
import {
	border,
	borderHover,
	borderHoverGroup,
	ring,
	ringHover,
	textOutlined,
	borderExpanded,
	ringHoverless
} from '../statez';

export const variantOutlined = mergeConfigs(textOutlined, ring, { $base: 'bg-transparent' });

export const variantOutlinedHover = mergeConfigs(variantOutlined, ringHover);

export const variantOutlinedHoverless = { ...ringHoverless };

export const variantBorder = mergeConfigs(textOutlined, border);

export const variantBorderHover = mergeConfigs(variantBorder, borderHover);

export const variantBorderHoverGroup = mergeConfigs(variantBorder, borderHoverGroup);

export const variantBorderExpanded = { ...borderExpanded };
