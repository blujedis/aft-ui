import { mergeConfigs } from '$lib/theme';
import { fieldPadding } from '../options';

export const gridHeaderPadding = mergeConfigs(fieldPadding, {
	unstyled: '',
	xs: 'py-1',
	sm: 'py-1.5',
	md: 'py-2',
	lg: 'py-2.5',
	xl: 'py-3',
	xl2: 'py-3.5'
});
