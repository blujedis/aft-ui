import { placeholder } from '../../theme';
export const card = {
	default: {
		...placeholder
	},
	divided: {
		...placeholder,
		$base: 'divide-y divide-opacity-40',
		white: 'divide-white',
		default: 'divide-default-200 divide-opacity-70',
		primary: 'divide-primary-200',
		secondary: 'divide-secondary-200',
		tertiary: 'divide-tertiary-200',
		danger: 'divide-danger-200',
		warning: 'divide-warning-200',
		success: 'divide-success-200',
		info: 'divide-info-200'
	}
};
