import type { ThemeColor, ThemeShade } from '../types';
type TypeOrValue<Keys extends string | number | symbol> = Keys | (string & {
    value?: any;
});
type TokenOpacity = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100;
type TokenWidth = 0 | 1 | 2 | 3 | 4 | 8;
type ThemeColorBase = ThemeColor | `${ThemeColor}-${ThemeShade}`;
type TokenColor = ThemeColorBase | `${ThemeShade}/${TokenOpacity}`;
type TokenTuple = [TypeOrValue<TokenColor | ThemeShade>, TypeOrValue<TokenColor | ThemeShade>?];
type TokenValue = TypeOrValue<TokenColor | ThemeShade> | TokenTuple;
type TokenVariantModifier = string[];
type TokenConfHandler = (tokens: TokenMap) => string | TokenConfInit;
type TokenConfInit = string | (Partial<Record<ThemeColor, TokenValue>> & {
    $base?: string | Partial<Record<ThemeColor | '$base', TokenValue>>;
});
type TokenVariant = {
    variant?: string;
    modifiers: string | TokenVariantModifier;
    colors?: TokenConfInit | TokenConfHandler;
};
type TokenMap = Record<string, TokenVariant>;
interface GenerateOptions {
    bodyTextLight: ThemeColorBase | 'white' | 'black';
    bodyTextDark: ThemeColorBase | 'white' | 'black';
    bodyBgLight: ThemeColorBase | 'white' | 'black';
    bodyBgDark: ThemeColorBase | 'white' | 'black';
    defaultShade: ThemeShade;
    softOpacity: TokenOpacity;
    hoverOpacity: TokenOpacity;
    focusOpacity: TokenOpacity;
    softSelectedOpacity: TokenOpacity;
    disabledOpacity: TokenOpacity;
    focusOffset: TokenWidth;
    focusWidth: TokenWidth;
    formBorderColorLight: ThemeColorBase;
    formBorderColorDark?: ThemeColorBase;
    panelBgLight: ThemeColorBase;
    panelBgDark: ThemeColorBase;
    panelContainerBgLight: ThemeColorBase;
    panelContainerBgDark: ThemeColorBase;
}
export declare const defaultOptions: GenerateOptions;
export declare function generateTokens<T extends TokenMap>(options?: Partial<GenerateOptions>): string;
export {};
