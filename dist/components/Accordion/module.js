import { accordionOptionDefaults } from '../AccordionOption';
const { variant, ...rest } = accordionOptionDefaults;
export const accordionDefaults = {
	...rest,
	as: 'div',
	multiple: false,
	selected: [],
	theme: 'default',
	variant: 'default'
};
