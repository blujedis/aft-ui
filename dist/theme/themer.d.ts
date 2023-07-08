import classnames from 'classnames';
import type { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';
import type { PropsWithoutPrefix, ThemeConfig, ThemeOptions, ThemeColor, Path } from './types';
type Primitive = boolean | string | number | undefined | Primitive[];
/**
 * Simple string formatter that replaces values by positional order of arguments matched.
 *
 * @param template the template to be formatted
 * @param token the token to search for ex: {{theme}}
 * @param args the positional arguments to replace tokens with.
 */
export declare function formatter(template: string, token: string, ...args: any[]): string;
export declare function themer<C extends ThemeConfig>(
	themeConfig: C
): {
	create: (instanceName?: string) => {
		variant: {
			<
				N extends
					| 'accordion'
					| 'accordionButton'
					| 'accordionOption'
					| 'avatar'
					| 'avatarNotification'
					| 'avatarPlaceholder'
					| 'avatarStack'
					| 'badge'
					| 'breadcrumbNav'
					| 'breadcrumbOption'
					| 'breadcrumbOptionItem'
					| 'button'
					| 'buttonGroupItem'
					| 'card'
					| 'cardContent'
					| 'checkbox'
					| 'dropdownOptionGroup'
					| 'dropdownOption'
					| 'dropdownPanel'
					| 'empty'
					| 'input'
					| 'kbd'
					| 'label'
					| 'modal'
					| 'notification'
					| 'notificationIcon'
					| 'notificationTitle'
					| 'notificationPosition'
					| 'notificationController'
					| 'paginationDetail'
					| 'paginationPage'
					| 'popover'
					| 'progressBar'
					| 'progressCircleTrack'
					| 'progressCircleValue'
					| 'progressCircleText'
					| 'radio'
					| 'rangeTrackBackground'
					| 'rangeTrackAccent'
					| 'rangeThumbBorder'
					| 'rangeThumbBackground'
					| 'select'
					| 'selectOption'
					| 'switchBackdrop'
					| 'switchFill'
					| 'switchHandle'
					| 'tab'
					| 'tabController'
					| 'textarea'
					| 'tile',
				V extends keyof typeof import('../components/configs')[N]
			>(
				name: N,
				variant?: V | undefined,
				when?: Primitive
			): any;
			<
				N_1 extends
					| 'accordion'
					| 'accordionButton'
					| 'accordionOption'
					| 'avatar'
					| 'avatarNotification'
					| 'avatarPlaceholder'
					| 'avatarStack'
					| 'badge'
					| 'breadcrumbNav'
					| 'breadcrumbOption'
					| 'breadcrumbOptionItem'
					| 'button'
					| 'buttonGroupItem'
					| 'card'
					| 'cardContent'
					| 'checkbox'
					| 'dropdownOptionGroup'
					| 'dropdownOption'
					| 'dropdownPanel'
					| 'empty'
					| 'input'
					| 'kbd'
					| 'label'
					| 'modal'
					| 'notification'
					| 'notificationIcon'
					| 'notificationTitle'
					| 'notificationPosition'
					| 'notificationController'
					| 'paginationDetail'
					| 'paginationPage'
					| 'popover'
					| 'progressBar'
					| 'progressCircleTrack'
					| 'progressCircleValue'
					| 'progressCircleText'
					| 'radio'
					| 'rangeTrackBackground'
					| 'rangeTrackAccent'
					| 'rangeThumbBorder'
					| 'rangeThumbBackground'
					| 'select'
					| 'selectOption'
					| 'switchBackdrop'
					| 'switchFill'
					| 'switchHandle'
					| 'tab'
					| 'tabController'
					| 'textarea'
					| 'tile',
				V_1 extends keyof typeof import('../components/configs')[N_1]
			>(
				name: N_1,
				variant?: V_1 | undefined,
				theme?: ThemeColor,
				when?: Primitive
			): any;
		};
		option: <
			K extends
				| 'borderSizes'
				| 'borderStyles'
				| 'fieldPadding'
				| 'buttonPadding'
				| 'objectFit'
				| 'objectPosition'
				| 'aspectRatio'
				| 'roundeds'
				| 'fontSizes'
				| 'fieldFontSizes'
				| 'boxPadding'
				| 'shadows'
				| 'dropshadows'
				| 'resizes'
				| 'fontLeadings'
				| 'focused'
				| 'focusedVisible'
				| 'focusedSizes'
				| 'focusedVisibleSizes'
				| 'focusedPositionSizes'
				| 'disableds'
				| 'placeholders'
				| 'common'
				| 'avatarSizes'
				| 'avatarNotificationSizes'
				| 'badgeFontSizes'
				| 'badgePadding'
				| 'badgeFieldPadding'
				| 'badgeIconSizes'
				| 'breadcrumbSpacings'
				| 'breadcrumbMargins'
				| 'checkboxSizes'
				| 'iconDropdownSizes'
				| 'cardPadding'
				| 'cardPaddingHeader'
				| 'cardPaddingFooter'
				| 'emptySizes'
				| 'iconSizes'
				| 'ratingSizes'
				| 'paginationGroupedPadding'
				| 'paginationFlushedPadding'
				| 'paginationIconSizes'
				| 'progressBarSizes'
				| 'progressBarRoundedBar'
				| 'progressBarRoundedValue'
				| 'progressCircleSizes'
				| 'progressCircleTextSizes'
				| 'progressCircleTrackSizes'
				| 'rangeTrackSizes'
				| 'rangeThumbSizes'
				| 'rangeBorderSizes'
				| 'switchButtonSizes'
				| 'switchFillSizes'
				| 'switchHandleSizes'
				| 'switchTranslateSizes'
		>(
			key: K,
			prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined,
			when: Primitive
		) => any;
		mapped: <T extends Record<string, unknown>, K_1 extends Path<T>>(
			obj: T,
			key: K_1,
			when: Primitive
		) => any;
		remove: (classes: string | string[], when: Primitive) => any;
		append: (arg: ClassNameValue, when: Primitive) => any;
		compile: (withTailwindMerge?: boolean) => string;
		classes: () => {
			base: string[];
			themed: string[];
			removed: string[];
			appended: classnames.ArgumentArray;
		};
	};
};
export declare namespace themer {
	var join: (...classes: (string | string[])[]) => string;
	var merge: (...classes: ClassNameValue[]) => string;
	var format: typeof formatter;
	var includes: (source: Primitive | Primitive[], values: Primitive | Primitive[]) => boolean;
}
export {};
