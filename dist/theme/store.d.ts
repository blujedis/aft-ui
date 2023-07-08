import { type Writable } from 'svelte/store';
import type { DeepPartial, ThemeConfig } from './types';
import * as components from '../components/configs';
export type ThemeStore<T> = Omit<Writable<T>, 'update'> & {
	get(): T;
	update(theme: DeepPartial<T>): void;
};
export declare const themeStore: ThemeStore<{
	options: {
		avatarSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		avatarNotificationSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		badgeFontSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		badgePadding: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		badgeFieldPadding: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			/**
			 * Replaces target values with overrides, ensures all target values exist.
			 *
			 * @param target the target to merge overrides into.
			 * @param overrides the values used to override target values.
			 */
			lg: string;
			xl: string;
			xl2: string;
		};
		badgeIconSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		breadcrumbSpacings: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		breadcrumbMargins: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		checkboxSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		iconDropdownSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		cardPadding: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		cardPaddingHeader: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		cardPaddingFooter: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		emptySizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		iconSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		ratingSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		paginationGroupedPadding: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		paginationFlushedPadding: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		paginationIconSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		progressBarSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		progressBarRoundedBar: {
			unstyled: string;
			none: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
			full: string;
		} & {
			unstyled: string;
			none: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
			full: string;
		} & import('./utils').StringMap;
		progressBarRoundedValue: {
			unstyled: string;
			none: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
			full: string;
		};
		progressCircleSizes: {
			unstyled: number;
			xs: number;
			sm: number;
			md: number;
			lg: number;
			xl: number;
			xl2: number;
		};
		progressCircleTextSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		progressCircleTrackSizes: {
			unstyled: number;
			xs: number;
			sm: number;
			md: number;
			lg: number;
			xl: number;
			xl2: number;
		};
		rangeTrackSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		rangeThumbSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		rangeBorderSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		switchButtonSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		switchFillSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		switchHandleSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		switchTranslateSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		borderSizes: {
			unstyled: string;
			transparent: string;
			none: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		borderStyles: {
			unstyled: string;
			none: string;
			solid: string;
			dashed: string;
			dotted: string;
			double: string;
			hidden: string;
		};
		fieldPadding: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		buttonPadding: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		objectFit: {
			unstyled: string;
			none: string;
			contain: string;
			cover: string;
			fill: string;
			scaled: string;
		};
		objectPosition: {
			unstyled: string;
			center: string;
			top: string;
			'top-right': string;
			'top-left': string;
			bottom: string;
			'bottom-right': string;
			'botom-left': string;
			left: string;
			right: string;
		};
		aspectRatio: {
			unstyled: string;
			auto: string;
			square: string;
			video: string;
		};
		roundeds: {
			unstyled: string;
			none: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
			full: string;
		};
		fontSizes: {
			unstyled: string;
			base: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
			xl3: string;
			xl4: string;
			xl5: string;
			xl6: string;
			xl7: string;
			xl8: string;
			xl9: string;
		};
		fieldFontSizes: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		boxPadding: {
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		shadows: {
			unstyled: string;
			inner: string;
			none: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		dropshadows: {
			unstyled: string;
			inner: string;
			none: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		resizes: {
			unstyled: string;
			none: string;
			x: string;
			y: string;
			both: string;
		};
		fontLeadings: {
			unstyled: string;
			none: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
			xl3: string;
			xl4: string;
			tight: string;
			snug: string;
			normal: string;
			relaxed: string;
			loose: string;
		};
		focused: {
			$base: string;
			white: string;
			default: string;
			primary: string;
			secondary: string;
			tertiary: string;
			danger: string;
			warning: string;
			success: string;
			info: string;
		};
		focusedVisible: {
			$base: string;
			white: string;
			default: string;
			primary: string;
			secondary: string;
			tertiary: string;
			danger: string;
			warning: string;
			success: string;
			info: string;
		};
		focusedSizes: {
			$base: string;
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		focusedVisibleSizes: {
			$base: string;
			unstyled: string;
			xs: string;
			sm: string;
			md: string;
			lg: string;
			xl: string;
			xl2: string;
		};
		focusedPositionSizes: {
			$base: string;
			unstyled: string;
			inset: string;
			offset0: string;
			offset1: string;
			offset2: string;
			offset4: string;
			offset8: string;
		};
		disableds: {
			$base: string;
			white: string;
			default: string;
			primary: string;
			secondary: string;
			tertiary: string;
			danger: string;
			warning: string;
			success: string;
			info: string;
		};
		placeholders: {
			white: string;
			default: string;
			primary: string;
			secondary: string;
			tertiary: string;
			danger: string;
			warning: string;
			success: string;
			info: string;
		};
		common: {
			active: string;
			transition: string;
		};
	};
	defaults: import('./types').ThemeDefaults;
	components: typeof components;
	palette: {
		default: {
			'50': string;
			'100': string;
			'200': string;
			'300': string;
			'400': string;
			'500': string;
			'600': string;
			'700': string;
			'800': string;
			'900': string;
			'950': string;
			DEFAULT: string;
		};
		primary: {
			'50': string;
			'100': string;
			'200': string;
			'300': string;
			'400': string;
			'500': string;
			'600': string;
			'700': string;
			'800': string;
			'900': string;
			'950': string;
			DEFAULT: string;
		};
		secondary: {
			'50': string;
			'100': string;
			'200': string;
			'300': string;
			'400': string;
			'500': string;
			'600': string;
			'700': string;
			'800': string;
			'900': string;
			'950': string;
			DEFAULT: string;
		};
		tertiary: {
			'50': string;
			'100': string;
			'200': string;
			'300': string;
			'400': string;
			'500': string;
			'600': string;
			'700': string;
			'800': string;
			'900': string;
			'950': string;
			DEFAULT: string;
		};
		danger: {
			'50': string;
			'100': string;
			'200': string;
			'300': string;
			'400': string;
			'500': string;
			'600': string;
			'700': string;
			'800': string;
			'900': string;
			'950': string;
			DEFAULT: string;
		};
		warning: {
			'50': string;
			'100': string;
			'200': string;
			'300': string;
			'400': string;
			'500': string;
			'600': string;
			'700': string;
			'800': string;
			'900': string;
			'950': string;
			DEFAULT: string;
		};
		success: {
			'50': string;
			'100': string;
			'200': string;
			'300': string;
			'400': string;
			'500': string;
			/**
			 * Sets the theme configuration.
			 *
			 * NOTE: similar to interal store.set() but ensures defaults and validates types.
			 *
			 * @param theme the them configuration to update to.
			 */
			'600': string;
			'700': string;
			'800': string;
			'900': string;
			'950': string;
			DEFAULT: string;
		};
		info: {
			'50': string;
			'100': string;
			'200': string;
			'300': string;
			'400': string;
			'500': string;
			'600': string;
			'700': string;
			'800': string;
			'900': string;
			'950': string;
			DEFAULT: string;
		};
	};
}>;
/**
 * Creates a new store which updates the default store's components and options when changed.
 *
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export declare function createStore<T extends Record<string, unknown> & DeepPartial<ThemeConfig>>(
	extendTheme: T,
	baseTheme?: {
		options: {
			avatarSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			avatarNotificationSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			badgeFontSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			badgePadding: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			badgeFieldPadding: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				/**
				 * Replaces target values with overrides, ensures all target values exist.
				 *
				 * @param target the target to merge overrides into.
				 * @param overrides the values used to override target values.
				 */
				lg: string;
				xl: string;
				xl2: string;
			};
			badgeIconSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			breadcrumbSpacings: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			breadcrumbMargins: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			checkboxSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			iconDropdownSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			cardPadding: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			cardPaddingHeader: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			cardPaddingFooter: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			emptySizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			iconSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			ratingSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			paginationGroupedPadding: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			paginationFlushedPadding: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			paginationIconSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			progressBarSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			progressBarRoundedBar: {
				unstyled: string;
				none: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
				full: string;
			} & {
				unstyled: string;
				none: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
				full: string;
			} & import('./utils').StringMap;
			progressBarRoundedValue: {
				unstyled: string;
				none: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
				full: string;
			};
			progressCircleSizes: {
				unstyled: number;
				xs: number;
				sm: number;
				md: number;
				lg: number;
				xl: number;
				xl2: number;
			};
			progressCircleTextSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			progressCircleTrackSizes: {
				unstyled: number;
				xs: number;
				sm: number;
				md: number;
				lg: number;
				xl: number;
				xl2: number;
			};
			rangeTrackSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			rangeThumbSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			rangeBorderSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			switchButtonSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			switchFillSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			switchHandleSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			switchTranslateSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			borderSizes: {
				unstyled: string;
				transparent: string;
				none: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			borderStyles: {
				unstyled: string;
				none: string;
				solid: string;
				dashed: string;
				dotted: string;
				double: string;
				hidden: string;
			};
			fieldPadding: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			buttonPadding: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			objectFit: {
				unstyled: string;
				none: string;
				contain: string;
				cover: string;
				fill: string;
				scaled: string;
			};
			objectPosition: {
				unstyled: string;
				center: string;
				top: string;
				'top-right': string;
				'top-left': string;
				bottom: string;
				'bottom-right': string;
				'botom-left': string;
				left: string;
				right: string;
			};
			aspectRatio: {
				unstyled: string;
				auto: string;
				square: string;
				video: string;
			};
			roundeds: {
				unstyled: string;
				none: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
				full: string;
			};
			fontSizes: {
				unstyled: string;
				base: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
				xl3: string;
				xl4: string;
				xl5: string;
				xl6: string;
				xl7: string;
				xl8: string;
				xl9: string;
			};
			fieldFontSizes: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			boxPadding: {
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			shadows: {
				unstyled: string;
				inner: string;
				none: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			dropshadows: {
				unstyled: string;
				inner: string;
				none: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			resizes: {
				unstyled: string;
				none: string;
				x: string;
				y: string;
				both: string;
			};
			fontLeadings: {
				unstyled: string;
				none: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
				xl3: string;
				xl4: string;
				tight: string;
				snug: string;
				normal: string;
				relaxed: string;
				loose: string;
			};
			focused: {
				$base: string;
				white: string;
				default: string;
				primary: string;
				secondary: string;
				tertiary: string;
				danger: string;
				warning: string;
				success: string;
				info: string;
			};
			focusedVisible: {
				$base: string;
				white: string;
				default: string;
				primary: string;
				secondary: string;
				tertiary: string;
				danger: string;
				warning: string;
				success: string;
				info: string;
			};
			focusedSizes: {
				$base: string;
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			focusedVisibleSizes: {
				$base: string;
				unstyled: string;
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				xl2: string;
			};
			focusedPositionSizes: {
				$base: string;
				unstyled: string;
				inset: string;
				offset0: string;
				offset1: string;
				offset2: string;
				offset4: string;
				offset8: string;
			};
			disableds: {
				$base: string;
				white: string;
				default: string;
				primary: string;
				secondary: string;
				tertiary: string;
				danger: string;
				warning: string;
				success: string;
				info: string;
			};
			placeholders: {
				white: string;
				default: string;
				primary: string;
				secondary: string;
				tertiary: string;
				danger: string;
				warning: string;
				success: string;
				info: string;
			};
			common: {
				active: string;
				transition: string;
			};
		};
		defaults: import('./types').ThemeDefaults;
		components: typeof components;
		palette: {
			default: {
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				'600': string;
				'700': string;
				'800': string;
				'900': string;
				'950': string;
				DEFAULT: string;
			};
			primary: {
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				'600': string;
				'700': string;
				'800': string;
				'900': string;
				'950': string;
				DEFAULT: string;
			};
			secondary: {
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				'600': string;
				'700': string;
				'800': string;
				'900': string;
				'950': string;
				DEFAULT: string;
			};
			tertiary: {
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				'600': string;
				'700': string;
				'800': string;
				'900': string;
				'950': string;
				DEFAULT: string;
			};
			danger: {
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				'600': string;
				'700': string;
				'800': string;
				'900': string;
				'950': string;
				DEFAULT: string;
			};
			warning: {
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				'600': string;
				'700': string;
				'800': string;
				'900': string;
				'950': string;
				DEFAULT: string;
			};
			success: {
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				/**
				 * Sets the theme configuration.
				 *
				 * NOTE: similar to interal store.set() but ensures defaults and validates types.
				 *
				 * @param theme the them configuration to update to.
				 */
				'600': string;
				'700': string;
				'800': string;
				'900': string;
				'950': string;
				DEFAULT: string;
			};
			info: {
				'50': string;
				'100': string;
				'200': string;
				'300': string;
				'400': string;
				'500': string;
				'600': string;
				'700': string;
				'800': string;
				'900': string;
				'950': string;
				DEFAULT: string;
			};
		};
	}
): ThemeStore<T & ThemeConfig>;
