// See how the options work here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// Placeholder images - https://placehold.co/

export interface LazyImageOptions {
	root?: Element | Document | null;
	rootMargin?: string;
	threshold?: number;
}

const defaults = {
	root: null,
	rootMargin: '0px',
	threshold: 0
};

/**
 * Lazy load's an image.
 *
 * @example
 * <img use:lazyload={src} />
 *
 * @param image the image element to apply source to.
 * @param src the image source to be loaded.
 */
export const lazyImage =
	(options?: LazyImageOptions) => (image: HTMLImageElement, src: string | undefined | null) => {
		options = {
			...defaults,
			...options
		};

		const loaded = () => {
			//image.classList.add('visible')                          // doesn't work in REPL
			image.style.opacity = '1'; // REPL hack to apply loading animation
		};

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				console.info(`Lazy loaded image ${src}.`); // console log for REPL

				image.src = src || ''; // swap placeholder w/ src on observe
				if (image.complete)
					// check if instantly loaded
					loaded();
				else image.addEventListener('load', loaded); // if not loaded add an event listener
			}
		}, options);

		observer.observe(image); // intersection observer

		return {
			destroy() {
				image.removeEventListener('load', loaded); // clean up the event listener
			}
		};
	};
