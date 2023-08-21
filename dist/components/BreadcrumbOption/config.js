import { text, textAriaSelectedSoft, textHover } from '../../constants';
import { mergeConfigs } from '../../theme';
export const filledTextHover = {
    $base: '',
    default: 'hover:text-[color:var(--text-dark-hover)]',
    dark: 'hover:text-[color:var(--text-light-hover)]',
    primary: 'hover:text-primary-100',
    secondary: 'hover:text-secondary-100',
    tertiary: 'hover:text-tertiary-100',
    danger: 'hover:text-danger-100',
    warning: 'hover:text-warning-100',
    success: 'hover:text-success-100',
    info: 'hover:text-info-100'
};
const defaultBreadcrumbOption = mergeConfigs(text, textHover, textAriaSelectedSoft);
export const breadcrumbOption = {
    text: {
        ...defaultBreadcrumbOption
    },
    filled: mergeConfigs(textAriaSelectedSoft, filledTextHover, {
        $base: 'text-white hover:text-[color:var(--text-light)]',
        light: 'text-[color:var(--text-dark)]'
    }),
    glass: mergeConfigs(textAriaSelectedSoft, text, textHover, {})
};
