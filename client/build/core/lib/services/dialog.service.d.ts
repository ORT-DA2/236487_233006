import { Dialog, DialogType } from "@core";
import { DialogPayload } from "../utils";
import * as i0 from "@angular/core";
export declare class DialogService {
    private dialogStateTracker$;
    private payloadState$;
    dialog$: import("rxjs").Observable<Dialog>;
    payload$: import("rxjs").Observable<DialogPayload | null>;
    openDialog(dialogType: DialogType, payload?: DialogPayload | null): void;
    closeDialog(dialogType: DialogType): void;
    get data(): any | null;
    get payload(): DialogPayload | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DialogService>;
}
