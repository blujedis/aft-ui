import { mergeConfigs } from '../../theme';
import { variantFilled, variantOutlined } from '../Button/config';
const baseVariant = mergeConfigs(variantFilled, {
    $base: 'text-inherit border border-transparent bg-default-100 text-white font-medium'
    // white: 'text-inherit bg-white hover:bg-default-100',
    // default: 'text-default-600 hover:text-default-800 hover:bg-default-300',
    // primary: 'text-primary-600 hover:text-primary-800 hover:bg-primary-600',
    // secondary: 'text-secondary-600 hover:text-secondary-800 hover:bg-secondary-600',
    // tertiary: 'text-tertiary-600 hover:text-tertiary-800 hover:bg-tertiary-600',
    // danger: 'text-danger-600 hover:text-danger-800 hover:bg-danger-600',
    // warning: 'text-warning-600 hover:text-warning-800 hover:bg-warning-600',
    // success: 'text-success-600 hover:text-success-800 hover:bg-success-600',
    // info: 'text-info-600 hover:text-info-800 hover:bg-info-600'
});
export const tile = {
    default: { ...baseVariant },
    filled: { ...baseVariant },
    outline: mergeConfigs(variantOutlined, {
        $base: 'hover:text-inherit ring-1 font-medium'
        // white: 'text-white hover:text-default-200 border-white hover:border-default-100',
        // default: 'text-default-600 hover:text-default-800 border-default-200 hover:border-default-300',
        // primary: 'text-primary-600 hover:text-primary-800 border-primary-500 hover:border-primary-600',
        // secondary: 'text-secondary-600 hover:text-secondary-800 border-secondary-500 hover:border-secondary-600',
        // tertiary: 'text-tertiary-600 hover:text-tertiary-800 border-tertiary-500 hover:border-tertiary-600',
        // danger: 'text-danger-600 hover:text-danger-800 border-danger-500 hover:border-danger-600',
        // warning: 'text-warning-600 hover:text-warning-800 border-warning-500 hover:border-warning-600',
        // success: 'text-success-600 hover:text-success-800 border-success-500 hover:border-success-600',
        // info: 'text-info-600 hover:text-info-800 border-info-500 hover:border-info-600'
    })
};
