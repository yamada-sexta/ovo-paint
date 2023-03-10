import {DocNode} from "../../../../core/src/Documents/DocNodes/DocNode";
import {GroupNode} from "../../../../core/src/Documents/DocNodes/GroupNode";

export function findParentNode(node: DocNode, root: GroupNode): GroupNode | null {
    for (let child of root.children) {
        if (child === node) {
            return root;
        }
        if (child instanceof GroupNode) {
            const parent = findParentNode(node, child);
            if (parent) {
                return parent;
            }
        }
    }
    return null;
}

/**
 * Returns true if the target node is not in the path from the parent to the destination node.
 * @param parent
 * @param destination
 * @param target
 */
export function notInPath(parent: DocNode, destination: DocNode, target: DocNode): boolean {
    if (parent === destination) {
        return false;
    }
    if (parent === target) {
        return true;
    }
    if (parent instanceof GroupNode) {
        for (let child of parent.children) {
            if (notInPath(child, destination, target)) {
                return true;
            }
        }
    }
    return false;
}