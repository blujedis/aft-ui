import { placeholder } from '../placeholder';
const baseVariant = {
    $base: 'divide-y divide-frame-200 border border-frame-200',
    dark: '',
    light: '',
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
        dark: '',
        light: '',
        primary: '',
        secondary: '',
        tertiary: '',
        danger: '',
        warning: '',
        success: '',
        info: ''
    }
};
