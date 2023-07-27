import { placeholder } from '../placeholder';
const baseVariant = {
    $base: 'divide-y divide-frame-200 border border-frame-200',
    white: '',
    frame: '',
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
        frame: '',
        primary: '',
        secondary: '',
        tertiary: '',
        danger: '',
        warning: '',
        success: '',
        info: ''
    }
};
