import { variantFilled, variantOutlined, variantFlushed } from '../Button/config';
const baseVariant = {
    ...variantOutlined
};
export const input = {
    default: {
        ...baseVariant
    },
    outlined: {
        ...baseVariant
    },
    filled: {
        ...variantFilled
    },
    flushed: {
        ...variantFlushed
    }
};
