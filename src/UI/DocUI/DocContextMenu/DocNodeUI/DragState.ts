import {DocNode} from "../../../../Core/Documents/DocNodes/DocNode";


export type DragState = {
    draggedNode: DocNode | null;
    // nodeDict: { [key: string]: DocNode };
}