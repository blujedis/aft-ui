import type { ThemeColor, ThemeShade } from '../types';
type TypeOrValue<Keys extends string | number | symbol> = Keys | (string & {
    value?: any;
});
type TokenPath = 'string';
type TokenColorRGB<P extends 'rgb' | 'rgba' = 'rgba' | 'rgb'> = `${P}(${number},${number | string},${number | string})` | `${P}(${number | string},${number | string},${number | string},${number | string})`;
type TokenColorHSL<P extends 'hsl' | 'hsla' = 'hsl' | 'hsla'> = `${P}(${number},${number | string},${number | string})` | `${P}(${number | string},${number | string},${number | string},${number | string})`;
type TokenColorHex = `#${string}` | `#${string}/${number}`;
type TokenColorVar = `--${string}`;
type TokenColorBase = `--${string}` | TokenColorHex | TokenColorRGB | TokenColorHex | TokenColorVar | TokenColorHSL | `${ThemeColor}-${ThemeShade}/${number}` | `${ThemeColor}-${ThemeShade}` | number;
type TokenColor = TypeOrValue<TokenColorBase>;
type TokenTuple = [TokenColor, TokenColor?];
type TokenValue = TokenColor | TokenPath | TokenTuple;
type TokenVariantModifier = {
    text?: string[];
    container?: string[];
};
type TokenConfInit = string | (Partial<Record<ThemeColor | '$base', TokenValue>> & {
    $base?: string | Partial<Record<ThemeColor | '$base', TokenValue>>;
});
type TokenVariant = {
    variant?: string;
    modifiers: TokenVariantModifier;
    alias?: TokenVariantModifier;
    text?: TokenConfInit;
    container?: TokenConfInit;
};
type TokenMap = Record<string, Record<string, TokenVariant>>;
export declare const defaultTokens: {
    filled: {
        default: {
            modifiers: {
                text: string[];
                container: string[];
            };
            text: {
                $base: string;
                default: string[];
                dark: string;
                primary: string;
                secondary: string;
                tertiary: string;
                danger: string;
                warning: string;
                success: string;
                info: string;
            };
            container: {
                default: string[];
                dark: string[];
                primary: number;
                secondary: number;
                tertiary: number;
                danger: number;
                warning: number;
                success: number;
                info: number;
            };
        };
        selected: {
            modifiers: {
                text: string[];
                container: string[];
            };
            text: {
                $base: string;
                default: string;
                dark: string;
                primary: string;
                secondary: string;
                tertiary: string;
                danger: string;
                warning: string;
                success: string;
                info: string;
            };
            container: any;
        };
    };
    outlined: {
        default: {
            modifiers: {
                text: string[];
                container: string[];
            };
            text: {
                default: string[];
                dark: string[];
                primary: number[];
                secondary: number[];
                tertiary: number[];
                danger: number[];
                warning: number[];
                success: number[];
                info: number[];
                $base: string;
            };
            container: string;
        };
    };
    ghost: {
        default: {
            modifiers: {
                text: string[];
                container: never[];
            };
            text: string;
            container: {
                default: string[];
                dark: string[];
                primary: string[];
                secondary: string[];
                tertiary: string[];
                danger: string[];
                warning: string[];
                success: string[];
                info: string[];
            };
        };
        hover: {
            modifiers: {
                text: never[];
                container: string[];
            };
            text: {};
            container: {
                default: string[];
                dark: string[];
                primary: string[];
                secondary: string[];
                tertiary: string[];
                danger: string[];
                warning: string[];
                success: string[];
                info: string[];
            };
        };
        focus: {
            modifiers: {
                text: never[];
                container: string[];
            };
            alias: {
                container: string[];
            };
            text: {};
            container: string;
        };
    };
};
export declare function parseTokens<T extends TokenMap, C extends Record<ThemeColor | 'white' | 'black', string>>(tokens: T, colors?: C): string;
export {};
