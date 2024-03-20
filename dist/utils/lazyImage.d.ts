export interface LazyImageOptions {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number;
}
/**
 * Lazy load's an image.
 *
 * @example
 * <img use:lazyload={src} />
 *
 * @param image the image element to apply source to.
 * @param src the image source to be loaded.
 */
export declare const lazyImage: (options?: LazyImageOptions) => (image: HTMLImageElement, src: string | undefined | null) => {
    destroy(): void;
};
