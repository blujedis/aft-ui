import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
	ThemeVariant
} from '$lib/types';

export type BreadcrumbContext = {
	globals: {
		rounded: ThemeRounded;
		shadowed: ThemeShadowed;
		size: ThemeSize;
		theme: ThemeColor;
		transitioned: ThemeTransitioned;
		variant: BreadcrumbVariant;
	};
};

export type BreadcrumbVariant = Exclude<ThemeVariant, 'flushed' | 'outlined'>;

export type BreadcrumbProps = {
	full?: boolean;
	generate?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: BreadcrumbVariant;
};

export const breadcrumbDefaults: Partial<BreadcrumbProps> = {
	size: 'md',
	theme: 'default',
	variant: 'text'
};
