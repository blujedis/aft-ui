import { buttonDefaults } from '../Button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { mode, ...rest } = buttonDefaults;
export const dropdownDefaults = {
    ...rest,
    as: 'button',
    autoclose: true,
    escapable: true,
    focustrap: true,
    items: [],
    trigger: 'click'
};
