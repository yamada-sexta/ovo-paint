import {DocNode} from "./Documents/DocNodes/DocNode";
import {Vec2} from "./submodules/common-ts-utils/Math/Vector";

export interface PaintToolEvent<NodeType extends DocNode> {
    pos: Vec2;
    pressure: number;
    key: {
        shift: boolean;
        ctrl: boolean;
        alt: boolean;
    }
    node: NodeType;
}
