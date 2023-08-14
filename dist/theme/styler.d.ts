import type { PropsWithoutPrefix, ThemeConfig, ThemeOptions } from '../types/theme';
type Primitive = boolean | string | number | undefined | Primitive[];
/**
 * Creates a new styler instance.
 *
 * @param name the name of the styler used in errors/logging.
 */
export declare function styler<C extends ThemeConfig>(themeConfig: C): {
    create: (instanceName: string) => {
        add: (key: string, value: string | number, when: Primitive) => any;
        option: <K extends "borderSizes" | "borderStyles" | "fieldPaddingY" | "fieldPaddingTightY" | "fieldUpperPaddingY" | "fieldPaddingX" | "fieldPadding" | "buttonPadding" | "menuPadding" | "iconCaretSizes" | "objectFit" | "objectPosition" | "aspectRatio" | "roundeds" | "fontSizes" | "fieldFontSizes" | "boxPadding" | "shadows" | "dropshadows" | "resizes" | "fontLeadings" | "gridgaps" | "divideds" | "stripes" | "common" | "focusedRing" | "focusedRingVisible" | "focusedRingWithin" | "focusedRingPeer" | "focusedRingGroup" | "focusedBorder" | "focusedBorderVisible" | "focusedBorderWithin" | "focusedBorderPeer" | "focusedBorderGroup" | "focusedBorderGroupWithin" | "focusedOutline" | "focusedOutlineVisible" | "focusedOutlineWithin" | "focusedOutlinePeer" | "focusedOutlineGroup" | "disableds" | "placeholders" | "bgAriaChecked" | "bgGroupAriaChecked" | "bgAriaSelected" | "bgAriaExpanded" | "bgAriaGlassExpanded" | "bgAriaGlassSelected" | "textAriaExpanded" | "textAriaSelected" | "textAriaSelectedSoft" | "textAriaCurrent" | "borderAriaSelected" | "borderAriaExpanded" | "avatarSizes" | "avatarNotificationSizes" | "badgeFontSizes" | "badgePadding" | "badgeFieldPadding" | "badgeIconSizes" | "breadcrumbSpacings" | "breadcrumbMargins" | "breadcrumbFilledHeight" | "breadcrumbFilledIconWidth" | "checkboxSizes" | "cardSizes" | "cardPadding" | "cardPaddingHeader" | "cardPaddingFooter" | "cardFontSizes" | "emptySizes" | "gridHeaderPadding" | "iconSizes" | "ratingSizes" | "paginationGroupedPadding" | "paginationFlushedPadding" | "paginationIconSizes" | "popoverSizes" | "progressBarSizes" | "progressBarRoundedBar" | "progressBarRoundedValue" | "progressCircleSizes" | "progressCircleTextSizes" | "progressCircleTrackSizes" | "rangeTrackSizes" | "rangeThumbSizes" | "rangeBorderSizes" | "switchButtonSizes" | "switchFillSizes" | "switchHandleSizes" | "switchTranslateSizes">(name: K, path: PropsWithoutPrefix<keyof ThemeOptions[K], "$">, key: string, when: Primitive) => any;
        color: (key: string, value: string, when: Primitive) => any;
        colormap: <T extends Record<string, any>, K_1 extends keyof T>(obj: T, path: K_1, key: string, when: Primitive) => any;
        mapped: <T_1 extends Record<string, unknown>>(obj: T_1, path: string, key: string, when: Primitive, asColor?: boolean) => any;
        append: (value: string, when: Primitive) => any;
        remove: (key: string, when: Primitive) => any;
        compile: () => string;
    };
};
export {};
