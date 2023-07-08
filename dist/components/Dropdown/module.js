import { buttonDefaults } from '../Button';
export const dropdownDefaults = {
	...buttonDefaults,
	as: 'button',
	autoclose: true,
	escapable: true,
	focustrap: true,
	items: [],
	trigger: 'click'
};
