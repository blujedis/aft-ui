import type { SelectValue } from '../../stores/select';
export type TabPanelProps = {
    value: SelectValue;
    unmount?: boolean;
};
export declare const tabPanelDefaults: Partial<TabPanelProps>;
