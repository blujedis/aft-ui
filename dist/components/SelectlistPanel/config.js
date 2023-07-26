import { placeholder } from '../placeholder';
const baseVariant = {
    ...placeholder,
    $base: 'bg-white text-inherit ring-1 ring-black ring-opacity-10'
};
export const selectListPanel = {
    default: { ...baseVariant },
    filled: { ...baseVariant },
    outlined: { ...baseVariant },
    text: { ...baseVariant },
    ghost: { ...baseVariant },
    flushed: {
        ...baseVariant,
        $base: 'ring-0'
    }
};
