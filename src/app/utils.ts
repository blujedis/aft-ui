export function pathIncludes(path: string, current: string) {
	if (current === path) return true;
	if (current.includes(path) && path !== '/') return true;
	return false;
}
