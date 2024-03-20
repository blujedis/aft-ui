export interface PlaceholderMedia {
    background?: string;
    foreground?: string;
    width?: number;
    height?: number;
    retina?: '2x' | '3x';
    text?: string;
    font?: 'lato' | 'lora' | 'montserrat' | 'open sans' | 'oswald' | 'playfair display' | 'pt sans' | 'raleway' | 'roboto' | 'source sans pro';
    format?: 'png' | 'jpg' | 'jpeg' | 'webp' | 'mp4' | 'svg';
}
export declare function createPlaceholderUrl(options?: PlaceholderMedia): string;
