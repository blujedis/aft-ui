export type ResizerDirection = 'north' | 'south' | 'east' | 'west' | 'northwest' | 'northeast' | 'southwest' | 'southeast';
export type ResizerElement = HTMLElement & {
    $direction: ResizerDirection;
};
export interface ResizerHandles {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    topLeft?: boolean;
    topRight?: boolean;
    bottomLeft?: boolean;
    bottomRight?: boolean;
}
export interface ResizerRectangle {
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    newWidth?: number;
    newHeight?: number;
    newTop?: number;
    newRight?: number;
    newBottom?: number;
    newLeft?: number;
}
export interface ResizerPosition {
    x: number;
    y: number;
}
export interface ResizerOptions {
    classname?: string;
    handles?: ResizerHandles;
    onResizing?: (values: ResizerPosition & ResizerRectangle) => any;
    onResized?: (values: ResizerPosition & ResizerRectangle) => any;
    onDestroy?: () => any;
    debug?: boolean;
}
export declare function useResizer(options?: ResizerOptions): [(element: HTMLElement) => {
    destroy(): void;
}];
