import {DocNode} from "../../../core/src/Documents/DocNodes/DocNode";


export type DragState = {
    draggedNode: DocNode | null;
    nodeDict: { [key: string]: DocNode };
}