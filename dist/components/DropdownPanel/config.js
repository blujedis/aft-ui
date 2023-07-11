import { placeholder } from '../placeholder';
const baseVariant = {
    ...placeholder,
    $base: 'bg-white text-inherit border border-default-200'
};
export const dropdownPanel = {
    default: { ...baseVariant },
    filled: { ...baseVariant },
    outlined: { ...baseVariant },
    text: { ...baseVariant },
    ghost: { ...baseVariant }
};
