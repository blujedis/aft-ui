/**
 * Placeholder for future feature.
 */
export function useIntersection(targets = [], initClass, ...classes) {
    // Get all the elements you want to show on scroll
    const _targets = targets
        .map((target) => {
        if (typeof target === 'string')
            return Array.from(document.querySelectorAll(target));
        return target;
    })
        .flat();
    // For each entry add or remove specified class.
    const callback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting)
                entry.target.classList.add(...classes);
            else
                entry.target.classList.remove(...classes);
        });
    };
    const observer = new IntersectionObserver(callback);
    // Add each target to observer.
    _targets.forEach(function (target) {
        target.classList.add(initClass); // Init class on added to observer typically opacity-0.
        observer.observe(target); // Observe/watch the element.
    });
}
