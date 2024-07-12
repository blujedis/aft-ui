/**
 * Custom events require declaring the custom event names
 * in your app.d.ts file.
 *
 * @example
 * declare namespace svelte.JSX {
 *	interface HTMLAttributes<T> {
 *		onclick_outside: (e: any) => void;
 *	}
 * }
 */
export function createCustomEvent(event, name, beforeDispatch) {
    const beforeDispatchHandler = beforeDispatch || ((e, n) => n && !e.preventDefault);
    return function initListener(node) {
        const handle = (ev) => {
            let response = beforeDispatchHandler(ev, node);
            if (response) {
                if (response === true)
                    response = { detail: null };
                node.dispatchEvent(new CustomEvent(name, response));
            }
        };
        document.addEventListener(event, handle, true);
        return {
            destroy() {
                document.removeEventListener(event, handle, true);
            }
        };
    };
}
