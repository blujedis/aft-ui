import type { PropsWithoutPrefix, ThemeColor, ThemeColorShade, ThemeConfig, ThemeOptions } from '../types/theme';
type Primitive = boolean | string | number | undefined | Primitive[];
/**
 * Creates a new styler instance.
 *
 * @param name the name of the styler used in errors/logging.
 */
export declare function styler<C extends ThemeConfig>(themeConfig: C): {
    create: (instanceName: string) => {
        add: (key: string, value: string | number, when: Primitive) => any;
        option: <K extends "borderSizes" | "borderStyles" | "fieldPaddingY" | "fieldPaddingTightY" | "fieldUpperPaddingY" | "fieldPaddingX" | "fieldPadding" | "buttonPadding" | "menuPadding" | "objectFit" | "objectPosition" | "aspectRatio" | "roundeds" | "fontSizes" | "fieldFontSizes" | "boxPadding" | "shadows" | "dropshadows" | "resizes" | "fontLeadings" | "focused" | "focusedRingSizes" | "focusedOffsetSizes" | "focusedBorder" | "focusedBorderSizes" | "focusedBorderFlushSizes" | "focusedOutline" | "focusedOutlineSizes" | "focusedOutlineOffsetSizes" | "focusedFilters" | "disableds" | "placeholders" | "iconCaretSizes" | "common" | "avatarSizes" | "avatarNotificationSizes" | "badgeFontSizes" | "badgePadding" | "badgeFieldPadding" | "badgeIconSizes" | "breadcrumbSpacings" | "breadcrumbMargins" | "breadcrumbFilledHeight" | "breadcrumbFilledIconWidth" | "checkboxSizes" | "cardPadding" | "cardPaddingHeader" | "cardPaddingFooter" | "cardFontSizes" | "emptySizes" | "iconSizes" | "ratingSizes" | "paginationGroupedPadding" | "paginationFlushedPadding" | "paginationIconSizes" | "popoverSizes" | "progressBarSizes" | "progressBarRoundedBar" | "progressBarRoundedValue" | "progressCircleSizes" | "progressCircleTextSizes" | "progressCircleTrackSizes" | "rangeTrackSizes" | "rangeThumbSizes" | "rangeBorderSizes" | "switchButtonSizes" | "switchFillSizes" | "switchHandleSizes" | "switchTranslateSizes">(name: K, path: PropsWithoutPrefix<keyof ThemeOptions[K], "$">, key: string, when: Primitive) => any;
        palette: (theme: ThemeColor, shade: ThemeColorShade | 'DEFAULT' | null | undefined, key: string, when: Primitive) => any;
        mapped: <T extends Record<string, unknown>>(obj: T, path: string, key: string, when: Primitive) => any;
        append: (value: string, when: Primitive) => any;
        remove: (key: string, when: Primitive) => any;
        compile: () => string;
    };
};
export {};
