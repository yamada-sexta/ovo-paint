import {OVOUIManager} from "../OVOUIManager";

export interface IOVORootUI {
    getUI(manager: OVOUIManager): HTMLElement

    onAppended(manager: OVOUIManager): void
}