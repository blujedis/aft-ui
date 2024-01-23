import type { ThemeColor, ThemeShade } from '../types';
type TokenKey = 'filled' | 'muted' | 'outlined' | 'ghost' | 'label';
type TokenConfigKey = keyof TokenVariant;
type TokenPath = `${TokenKey}.${TokenConfigKey}` | `${TokenKey}.${TokenConfigKey}.${ThemeColor | '$base'}`;
type TokenColorRGB<P extends 'rgb' | 'rgba' = 'rgba' | 'rgb'> = `${P}(${number},${number | string},${number | string})` | `${P}(${number | string},${number | string},${number | string},${number | string})`;
type TokenColorHSL<P extends 'hsl' | 'hsla' = 'hsl' | 'hsla'> = `${P}(${number},${number | string},${number | string})` | `${P}(${number | string},${number | string},${number | string},${number | string})`;
type TokenColorHex = `#${string}` | `#${string}/${number}`;
type TokenColorVar = `--${string}`;
type TokenColor = `--${string}` | TokenColorHex | TokenColorRGB | TokenColorHex | TokenColorVar | TokenColorHSL | `${ThemeColor}-${ThemeShade}/${number}` | `${ThemeColor}-${ThemeShade}` | number;
type TokenTuple = [TokenColor, TokenColor?];
type TokenValue = TokenColor | TokenPath | TokenTuple;
type TokenVariant = {
    modifiers?: Partial<Record<Exclude<keyof TokenVariant, 'modifiers' | 'rename'>, string[]>>;
    rename?: {
        [key: string]: string;
    };
    text?: TokenPath | Record<ThemeColor, TokenValue>;
    fill?: TokenPath | Record<ThemeColor, TokenValue>;
    hover?: TokenPath | Record<ThemeColor, TokenValue>;
    focus?: TokenPath | Record<ThemeColor, TokenValue>;
    selected?: TokenPath | Record<ThemeColor, TokenValue>;
};
type TokenConfig = Record<ThemeColor, string>;
type TokenMap<C extends TokenConfig | TokenVariant> = Record<TokenKey, C | TokenKey>;
export declare const defaultTokens: TokenMap<TokenVariant>;
export declare function parseTokens<T extends TokenMap<TokenVariant>, C extends Record<ThemeColor | 'white' | 'black', string>>(tokens: T, colors?: C): string;
export {};
