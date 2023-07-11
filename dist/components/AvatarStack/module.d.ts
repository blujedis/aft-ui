import type { AvatarProps } from '../Avatar/module';
export interface AvatarStackContext {
    globals: AvatarProps;
}
export type AvatarStackProps = Partial<AvatarProps> & {
    direction?: 'up' | 'down';
};
export declare const avatarStackDefaults: Partial<AvatarStackProps>;
