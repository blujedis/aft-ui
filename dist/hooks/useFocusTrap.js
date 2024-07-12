export const defaultFocusables = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[contenteditable]',
    '[tabindex]:not([tabindex="-1"])'
];
export function useFocusTrap(enabledOrOptions) {
    let options = enabledOrOptions;
    if (typeof enabledOrOptions === 'boolean') {
        options = {
            enabled: enabledOrOptions
        };
    }
    const { enabled, focusables, child } = {
        enabled: true,
        focusables: defaultFocusables,
        ...options
    };
    let elements = [];
    const isNext = (event) => event.key === 'Tab' && !event.shiftKey;
    const isPrevious = (event) => event.key === 'Tab' && event.shiftKey;
    const handleFocusTrap = (event) => {
        if (event.target === window)
            return;
        const eventTarget = event.target;
        const parentNode = elements.find((node) => {
            return node.contains(eventTarget);
        });
        if (!parentNode)
            return;
        const focusable = parentNode.querySelectorAll(focusables.join(', '));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (isNext(event) && event.target === last) {
            event.preventDefault();
            first.focus();
        }
        else if (isPrevious(event) && event.target === first) {
            event.preventDefault();
            last.focus();
        }
    };
    const bindFocusTrap = (initNode) => {
        let node = initNode;
        if (child) {
            node = node.querySelector(child);
        }
        if (!node)
            console.warn(`UseFocusTrap cannot trap focus using node of null or undefined.`);
        if (!enabled || !node)
            return {
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                destroy() { }
            };
        elements.push(node);
        return {
            destroy() {
                elements = elements.filter((element) => element !== node);
            }
        };
    };
    return [bindFocusTrap, handleFocusTrap];
}
