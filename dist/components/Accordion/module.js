import { accordionOptionDefaults } from '../AccordionOption';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { variant, ...rest } = accordionOptionDefaults;
export const accordionDefaults = {
    ...rest,
    as: 'div',
    multiple: false,
    selected: [],
    theme: 'light',
    variant: 'default'
};
