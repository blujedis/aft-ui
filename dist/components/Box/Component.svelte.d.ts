import { SvelteComponent } from "svelte";
import { type BoxProps } from './module';
import type { ElementProps } from '../../types';
declare class __sveltets_Render<Tag extends BlockTag> {
    props(): BoxProps<Tag> & ElementProps<Tag>;
    events(): {
        click: MouseEvent;
        drop: DragEvent;
        dragover: DragEvent;
        dragleave: DragEvent;
        dragend: DragEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
    };
}
export type ComponentProps<Tag extends BlockTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends BlockTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends BlockTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends BlockTag> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
}
export {};
