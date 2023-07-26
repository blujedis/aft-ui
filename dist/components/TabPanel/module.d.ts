import type { SelectStoreValue } from '../../stores/select';
export type TabPanelProps = {
    value: SelectStoreValue;
    unmount?: boolean;
};
export declare const tabPanelDefaults: Partial<TabPanelProps>;
