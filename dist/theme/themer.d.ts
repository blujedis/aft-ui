import { type ClassNameValue } from 'tailwind-merge';
import classnames from 'classnames';
type PrimitiveBase = boolean | string | number | undefined | null;
type Primitive = PrimitiveBase | Record<string, any> | PrimitiveBase[];
export interface ThemerApi<C extends ThemeConfig> {
    variant<N extends keyof C['components'], V extends keyof C['components'][N]>(name: N, variant: V, when?: Primitive): ThemerApi<C>;
    variant<N extends keyof C['components'], V extends keyof C['components'][N]>(name: N, variant: V, theme?: ThemeColor, when?: Primitive): ThemerApi<C>;
    option<K extends ThemeOption>(key: K, prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined, when: Primitive): ThemerApi<C>;
    mapped<T extends Record<string, unknown>, K extends Path<T>>(obj: T | null, key: K, when: Primitive): ThemerApi<C>;
    remove(classes: string | string[], when: Primitive): ThemerApi<C>;
    remove<K extends ThemeOption>(key: K, prop: PropsWithoutPrefix<keyof ThemeOptions[K], '$'> | undefined, when: Primitive): ThemerApi<C>;
    prepend(arg: ClassNameValue, when: Primitive): ThemerApi<C>;
    append(arg: ClassNameValue, when: Primitive): ThemerApi<C>;
    compile(withTailwindMerge?: boolean): string;
    classes(): {
        base: string[];
        themed: string[];
        removed: string[];
        prepended: classnames.ArgumentArray;
        appended: classnames.ArgumentArray;
    };
}
export type ThemerInstance<C extends ThemeConfig> = {
    create: (instanceName?: string) => ThemerApi<C>;
};
import type { PropsWithoutPrefix, ThemeConfig, ThemeOption, ThemeOptions, ThemeColor, Path } from '../types/theme';
/**
 * Simple string formatter that replaces values by positional order of arguments matched.
 *
 * @param template the template to be formatted
 * @param token the token to search for ex: {{theme}}
 * @param args the positional arguments to replace tokens with.
 */
export declare function formatter(template: string, token: string, ...args: any[]): string;
export declare function themer<C extends ThemeConfig>(themeConfig: C): ThemerInstance<C> | {
    create: (instanceName?: string) => {
        variant: <N extends "button" | "input" | "kbd" | "label" | "select" | "textarea" | "accordionButton" | "accordionContent" | "avatar" | "badge" | "breadcrumb" | "breadcrumbOption" | "buttonGroupItem" | "cardElement" | "checkbox" | "gridFilter" | "gridHeader" | "empty" | "flushed" | "menuOption" | "menuPanel" | "notification" | "notificationIcon" | "notificationTitle" | "paginationDetail" | "paginationPage" | "popover" | "progressBar" | "progressCircleTrack" | "progressCircleValue" | "progressCircleText" | "radio" | "rangeTrackBackground" | "rangeTrackAccent" | "rangeThumbBorder" | "rangeThumbBackground" | "selectOption" | "selectListButton" | "selectListOption" | "selectListPanel" | "switchBackdrop" | "switchFill" | "switchHandle" | "tab" | "tabs" | "tile", V extends keyof typeof import("../components/configs")[N]>(name: N, variant: V, theme?: ThemeColor | Primitive, when?: Primitive) => any;
        option: <K extends "animate" | "fill" | "borderSizes" | "borderStyles" | "fieldPaddingY" | "fieldPaddingTightY" | "fieldUpperPaddingY" | "fieldPaddingX" | "fieldPadding" | "buttonPadding" | "menuPadding" | "iconCaretSizes" | "objectFit" | "objectPosition" | "aspectRatio" | "roundeds" | "fontSizes" | "fieldFontSizes" | "boxPadding" | "shadows" | "dropshadows" | "resizes" | "fontLeadings" | "gridgaps" | "hovered" | "selected" | "focusedRing" | "focusedRingVisible" | "focusedRingWithin" | "focusedRingPeer" | "focusedRingGroup" | "focusedBorder" | "focusedBorderVisible" | "focusedBorderWithin" | "focusedBorderPeer" | "focusedBorderGroup" | "focusedBorderGroupWithin" | "focusedOutline" | "focusedOutlineVisible" | "focusedOutlineWithin" | "focusedOutlinePeer" | "focusedOutlineGroup" | "bgFilled" | "bgFilledHover" | "bgSelectedFilled" | "bgCheckedFilled" | "bgCheckedFilledGroup" | "bgCurrentFilled" | "bgExpandedFilled" | "bgGhost" | "bgGhostHover" | "bgSelectedGhost" | "bgCheckedGhost" | "bgCheckedGhostGroup" | "bgCurrentGhost" | "bgExpandedGhost" | "bgItemHover" | "bgItemSelected" | "bgItemCurrent" | "bgItemExpanded" | "bgItemChecked" | "bgItemCheckedGhost" | "bgItemCheckedFilled" | "disableds" | "placeholder" | "placeholders" | "textBase" | "textHover" | "textGhost" | "textGhostHover" | "textExpanded" | "textSoft" | "textHoverSoft" | "textFilled" | "textHoverFilled" | "textSelected" | "textCurrent" | "textOutlined" | "border" | "borderHover" | "borderHoverGroup" | "borderFlushed" | "borderflushedGroupHover" | "borderSelected" | "borderCurrent" | "borderExpanded" | "ring" | "ringHover" | "ringHoverless" | "ringSelected" | "ringCurrent" | "ringExpanded" | "common" | "divideds" | "stripes" | "stroke" | "filledText" | "filledBg" | "filledStroke" | "filledFill" | "filledBgEven" | "filledBgOdd" | "filledOutlineFocus" | "filledOutlineFocusVisible" | "filledOutlineFocusWithin" | "filledOutlinePeerFocus" | "filledOutlineGroupFocus" | "filledOutlineGroupFocusWithin" | "outlinedText" | "outlinedOutline" | "outlinedRing" | "outlinedBorder" | "outlinedOutlineFocus" | "outlinedOutlineFocusVisible" | "outlinedOutlineFocusWithin" | "outlinedOutlinePeerFocus" | "outlinedOutlineGroupFocus" | "outlinedOutlineGroupFocusWithin" | "ghostText" | "ghostOutlineFocus" | "ghostOutlineFocusVisible" | "ghostOutlineFocusWithin" | "ghostOutlinePeerFocus" | "ghostOutlineGroupFocus" | "ghostOutlineGroupFocusWithin" | "ghostBgHover" | "avatarSizes" | "avatarNotificationSizes" | "badgeFontSizes" | "badgePadding" | "badgeFieldPadding" | "badgeIconSizes" | "breadcrumbSpacings" | "breadcrumbMargins" | "breadcrumbFilledHeight" | "breadcrumbFilledIconWidth" | "checkboxSizes" | "cardSizes" | "cardPadding" | "cardPaddingHeader" | "cardPaddingFooter" | "cardFontSizes" | "emptySizes" | "gridHeaderPadding" | "iconSizes" | "ratingSizes" | "paginationGroupedPadding" | "paginationFlushedPadding" | "paginationIconSizes" | "popoverSizes" | "progressBarSizes" | "progressBarRoundedBar" | "progressBarRoundedValue" | "progressCircleSizes" | "progressCircleTextSizes" | "progressCircleTrackSizes" | "rangeTrackSizes" | "rangeThumbSizes" | "rangeBorderSizes" | "switchButtonSizes" | "switchFillSizes" | "switchHandleSizes" | "switchTranslateSizes">(key: K, prop: PropsWithoutPrefix<keyof ThemeOptions[K], "$"> | undefined, when: Primitive) => any;
        mapped: <T extends Record<string, unknown>, K_1 extends Path<T>>(obj: T | null, key: K_1, when: Primitive) => any;
        remove: <K_2 extends "animate" | "fill" | "borderSizes" | "borderStyles" | "fieldPaddingY" | "fieldPaddingTightY" | "fieldUpperPaddingY" | "fieldPaddingX" | "fieldPadding" | "buttonPadding" | "menuPadding" | "iconCaretSizes" | "objectFit" | "objectPosition" | "aspectRatio" | "roundeds" | "fontSizes" | "fieldFontSizes" | "boxPadding" | "shadows" | "dropshadows" | "resizes" | "fontLeadings" | "gridgaps" | "hovered" | "selected" | "focusedRing" | "focusedRingVisible" | "focusedRingWithin" | "focusedRingPeer" | "focusedRingGroup" | "focusedBorder" | "focusedBorderVisible" | "focusedBorderWithin" | "focusedBorderPeer" | "focusedBorderGroup" | "focusedBorderGroupWithin" | "focusedOutline" | "focusedOutlineVisible" | "focusedOutlineWithin" | "focusedOutlinePeer" | "focusedOutlineGroup" | "bgFilled" | "bgFilledHover" | "bgSelectedFilled" | "bgCheckedFilled" | "bgCheckedFilledGroup" | "bgCurrentFilled" | "bgExpandedFilled" | "bgGhost" | "bgGhostHover" | "bgSelectedGhost" | "bgCheckedGhost" | "bgCheckedGhostGroup" | "bgCurrentGhost" | "bgExpandedGhost" | "bgItemHover" | "bgItemSelected" | "bgItemCurrent" | "bgItemExpanded" | "bgItemChecked" | "bgItemCheckedGhost" | "bgItemCheckedFilled" | "disableds" | "placeholder" | "placeholders" | "textBase" | "textHover" | "textGhost" | "textGhostHover" | "textExpanded" | "textSoft" | "textHoverSoft" | "textFilled" | "textHoverFilled" | "textSelected" | "textCurrent" | "textOutlined" | "border" | "borderHover" | "borderHoverGroup" | "borderFlushed" | "borderflushedGroupHover" | "borderSelected" | "borderCurrent" | "borderExpanded" | "ring" | "ringHover" | "ringHoverless" | "ringSelected" | "ringCurrent" | "ringExpanded" | "common" | "divideds" | "stripes" | "stroke" | "filledText" | "filledBg" | "filledStroke" | "filledFill" | "filledBgEven" | "filledBgOdd" | "filledOutlineFocus" | "filledOutlineFocusVisible" | "filledOutlineFocusWithin" | "filledOutlinePeerFocus" | "filledOutlineGroupFocus" | "filledOutlineGroupFocusWithin" | "outlinedText" | "outlinedOutline" | "outlinedRing" | "outlinedBorder" | "outlinedOutlineFocus" | "outlinedOutlineFocusVisible" | "outlinedOutlineFocusWithin" | "outlinedOutlinePeerFocus" | "outlinedOutlineGroupFocus" | "outlinedOutlineGroupFocusWithin" | "ghostText" | "ghostOutlineFocus" | "ghostOutlineFocusVisible" | "ghostOutlineFocusWithin" | "ghostOutlinePeerFocus" | "ghostOutlineGroupFocus" | "ghostOutlineGroupFocusWithin" | "ghostBgHover" | "avatarSizes" | "avatarNotificationSizes" | "badgeFontSizes" | "badgePadding" | "badgeFieldPadding" | "badgeIconSizes" | "breadcrumbSpacings" | "breadcrumbMargins" | "breadcrumbFilledHeight" | "breadcrumbFilledIconWidth" | "checkboxSizes" | "cardSizes" | "cardPadding" | "cardPaddingHeader" | "cardPaddingFooter" | "cardFontSizes" | "emptySizes" | "gridHeaderPadding" | "iconSizes" | "ratingSizes" | "paginationGroupedPadding" | "paginationFlushedPadding" | "paginationIconSizes" | "popoverSizes" | "progressBarSizes" | "progressBarRoundedBar" | "progressBarRoundedValue" | "progressCircleSizes" | "progressCircleTextSizes" | "progressCircleTrackSizes" | "rangeTrackSizes" | "rangeThumbSizes" | "rangeBorderSizes" | "switchButtonSizes" | "switchFillSizes" | "switchHandleSizes" | "switchTranslateSizes">(classesOrKey: string | string[], propOrWhen: Primitive | PropsWithoutPrefix<keyof ThemeOptions[K_2], "$">, when?: Primitive) => any;
        prepend: (arg: ClassNameValue, when: Primitive) => any;
        append: (arg: ClassNameValue, when: Primitive) => any;
        compile: (withTailwindMerge?: boolean) => string;
        classes: () => {
            base: string[];
            themed: string[];
            removed: string[];
            prepended: classnames.ArgumentArray;
            appended: classnames.ArgumentArray;
        };
    };
};
export declare namespace themer {
    var join: (...classes: (string | string[])[]) => string;
    var merge: (...classes: ClassNameValue[]) => string;
    var format: typeof formatter;
}
export {};
