import { inputDefaults } from '../Input';
export const selectListButtonDefaults = {
    ...inputDefaults,
    caret: 'octicon:chevron-down-24',
    focused: 'alwaysWithin',
    placeholder: '',
    roticon: true,
    variant: 'default',
    onBeforeAdd: (value, input) => ({ label: value, value, group: '', selected: false }),
    onBeforeRemove: (item, input) => true // default just allow removal.
};
