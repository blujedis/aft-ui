export const selectListDefaults = {
    autoclose: true,
    escapable: true,
    filterable: false,
    filter: (q, i) => i.filter((v) => v.label.includes(q) || (v.value + '').includes(q) || (v.group + '')?.includes(q)),
    recordless: false,
    size: 'md',
    theme: 'frame',
    value: '',
    variant: 'outlined'
};
