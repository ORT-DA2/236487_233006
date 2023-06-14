import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { ToastrService } from "ngx-toastr";
import * as i0 from "@angular/core";
export declare class ErrorHandlerEffects {
    private readonly actions$;
    private readonly router;
    private toast;
    on401$: import("rxjs").Observable<{
        error: import("@angular/common/http").HttpErrorResponse;
    } & import("@ngrx/store/src/models").TypedAction<"[ngrx-error] THROW_401_ERROR">> & import("@ngrx/effects").CreateEffectMetadata;
    on403$: import("rxjs").Observable<{
        error: import("@angular/common/http").HttpErrorResponse;
    } & import("@ngrx/store/src/models").TypedAction<"[ngrx-error] THROW_403_ERROR">> & import("@ngrx/effects").CreateEffectMetadata;
    on404$: import("rxjs").Observable<{
        error: import("@angular/common/http").HttpErrorResponse;
    } & import("@ngrx/store/src/models").TypedAction<"[ngrx-error] THROW_404_ERROR">> & import("@ngrx/effects").CreateEffectMetadata;
    constructor(actions$: Actions, router: Router, toast: ToastrService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorHandlerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ErrorHandlerEffects>;
}
