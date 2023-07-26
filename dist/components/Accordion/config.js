import { placeholder } from '../placeholder';
const baseVariant = {
    $base: 'divide-y divide-default-200 border border-default-200',
    white: '',
    default: '',
    primary: '',
    secondary: '',
    tertiary: '',
    danger: '',
    warning: '',
    success: '',
    info: ''
};
export const accordion = {
    default: { ...baseVariant },
    outlined: { ...baseVariant },
    flushed: { ...placeholder },
    pills: {
        $base: '',
        white: '',
        default: '',
        primary: '',
        secondary: '',
        tertiary: '',
        danger: '',
        warning: '',
        success: '',
        info: ''
    }
};
