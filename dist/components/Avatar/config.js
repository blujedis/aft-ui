import { solid, text } from '../../constants';
export const avatar = {
    single: {
        $base: 'ring-1 ring-black ring-opacity-5'
    },
    stacked: {
        $base: 'ring-white ring-2'
    }
};
export const avatarNotification = {
    filled: {
        ...solid,
        $base: 'ring-white'
    }
};
export const avatarPlaceholder = {
    text: {
        ...text,
        $base: 'bg-frame-100 ring-1 ring-black ring-opacity-5'
    }
};
