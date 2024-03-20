const defaults = {
    onFind: (_items) => null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSelected: (_node) => { },
    onInit: (_items) => { },
    onNavigate: (_item, _index) => { }
};
export function useFocusNav(root, options) {
    const _options = {
        ...defaults,
        ...options
    };
    function getItems() {
        if (!root)
            return [];
        return (Array.from(root.children) || []);
    }
    function focusRoot() {
        if (root)
            root.focus();
    }
    function onKeydown(e, preventDefault = false) {
        if (e.repeat || !['ArrowUp', 'ArrowDown', ' ', 'Enter'].includes(e.key))
            return;
        const items = getItems();
        if (!items?.length || !root)
            return; // nothing to do aren't any option items.
        const activeNode = document.activeElement;
        //////////////////////////////////////////////
        // User is selecting current value.
        //////////////////////////////////////////////
        if ((e.key === ' ' || e.key === 'Enter') && root.contains(activeNode)) {
            if (preventDefault)
                e.preventDefault();
            _options.onSelected(activeNode, e);
        }
        //////////////////////////////////////////////
        // User is navigating options.
        //////////////////////////////////////////////
        else {
            let currentNode;
            e.preventDefault(); // otherwise overflow will cause scroll jumping.
            if (root.contains(activeNode)) {
                // already navigating child nodes.
                const currentIndex = items.indexOf(activeNode);
                const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
                // Nothing to do is a repeat key or out of scope.
                if (nextIndex < 0 || nextIndex > items.length - 1)
                    return;
                // Otherwise set the current node to the new index.
                currentNode = items[nextIndex];
                _options.onNavigate(currentNode, Math.max(0, nextIndex - 1));
            }
            else {
                // dropdown expanded start at first or selected node.
                currentNode = _options.onFind(items, e);
                _options.onNavigate(currentNode, 0);
            }
            if (currentNode)
                currentNode.focus();
        }
    }
    _options.onInit(getItems());
    return {
        getItems,
        focusRoot,
        onKeydown
    };
}
