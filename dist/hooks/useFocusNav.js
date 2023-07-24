export function useFocusNav(root) {
    const options = {
        findActive: (_items) => null,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSelected: (_node) => { }
    };
    function onSelected(fn) {
        options.onSelected = fn;
    }
    function onFindActive(fn) {
        options.findActive = fn;
    }
    function getChildren() {
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
        const items = getChildren();
        if (!items?.length || !root)
            return; // nothing to do aren't any option items.
        const activeNode = document.activeElement;
        //////////////////////////////////////////////
        // User is selecting current value.
        //////////////////////////////////////////////
        if ((e.key === ' ' || e.key === 'Enter') && root.contains(activeNode)) {
            if (preventDefault)
                e.preventDefault();
            options.onSelected(activeNode);
        }
        //////////////////////////////////////////////
        // User is navigating options.
        //////////////////////////////////////////////
        else {
            let currentNode;
            if (root.contains(activeNode)) {
                // already navigating child nodes.
                const currentIndex = items.indexOf(activeNode);
                const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
                // Nothing to do is a repeat key or out of scope.
                if (nextIndex < 0 || nextIndex > items.length - 1)
                    return;
                // Otherwise set the current node to the new index.
                currentNode = items[nextIndex];
            }
            else {
                // dropdown expanded start at first or selected node.
                currentNode = options.findActive(items) || items[0];
            }
            if (currentNode)
                currentNode.focus();
        }
    }
    return {
        getChildren,
        focusRoot,
        onSelected,
        onFindActive,
        onKeydown
    };
}
export default useFocusNav;
// const isSelected = $context.selected.includes(activeNode.dataset.value as any);
// if (context.globals.multiple) {
//   if (isSelected) activeNode.dataset.value && context.remove(activeNode.dataset.value);
//   else context.select(activeNode.dataset.value);
// } else if (!$context.selected.includes(activeNode.dataset.value as any)) {
//   context.select(activeNode.dataset.value);
//   context.close();
// }
// if ($context.selected.includes(activeNode.dataset.value as any) && !context.globals.multiple) return;
