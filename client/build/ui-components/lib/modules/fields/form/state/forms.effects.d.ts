import { Actions } from "@ngrx/effects";
import { FormService } from "./form-service";
import * as i0 from "@angular/core";
export declare class FormsEffects {
    private actions$;
    private formService;
    onFormReset$: import("rxjs").Observable<import("@ngrx/store/src/models").TypedAction<"[ngrxForms] Reset Form">> & import("@ngrx/effects").CreateEffectMetadata;
    constructor(actions$: Actions, formService: FormService);
    static ɵfac: i0.ɵɵFactoryDeclaration<FormsEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormsEffects>;
}
