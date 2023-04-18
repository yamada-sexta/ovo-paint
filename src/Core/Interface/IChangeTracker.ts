import {IOperation} from "./IOperation";

export interface IChangeTracker {
    pushChange(change: IOperation): void;
}
