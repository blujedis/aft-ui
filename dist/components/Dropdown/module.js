import { buttonDefaults } from '../Button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { strategy, ...rest } = buttonDefaults;
export const dropdownDefaults = {
    ...rest,
    as: 'button',
    autoclose: true,
    escapable: true,
    filter: (q, i) => i.filter((v) => v.label.includes(q) || (v.value + '').includes(q) || v.group?.includes(q)),
    items: [],
    strategy: 'menu',
    trigger: 'click'
};
