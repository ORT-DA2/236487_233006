import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { formsActions } from "./forms.actions";
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "./form-service";
export class FormsEffects {
    constructor(actions$, formService) {
        this.actions$ = actions$;
        this.formService = formService;
        this.onFormReset$ = createEffect(() => this.actions$.pipe(ofType(formsActions.resetForm), tap(() => this.formService.resetForm$.next())), { dispatch: false });
    }
}
FormsEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormsEffects, deps: [{ token: i1.Actions }, { token: i2.FormService }], target: i0.ɵɵFactoryTarget.Injectable });
FormsEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormsEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormsEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.FormService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy9mb3JtL3N0YXRlL2Zvcm1zLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQVUsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQU0sR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUk3QyxNQUFNLE9BQU8sWUFBWTtJQVV4QixZQUNTLFFBQWlCLEVBQ2pCLFdBQXdCO1FBRHhCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFUakMsaUJBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQ2hELEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUM3QyxFQUNGLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUNuQixDQUFDO0lBS0UsQ0FBQzs7eUdBYk8sWUFBWTs2R0FBWixZQUFZOzJGQUFaLFlBQVk7a0JBRHhCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7QWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGV9IGZyb20gXCJAbmdyeC9lZmZlY3RzXCI7XHJcbmltcG9ydCB7bWFwLCB0YXB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7Zm9ybXNBY3Rpb25zfSBmcm9tIFwiLi9mb3Jtcy5hY3Rpb25zXCI7XHJcbmltcG9ydCB7Rm9ybVNlcnZpY2V9IGZyb20gXCIuL2Zvcm0tc2VydmljZVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybXNFZmZlY3RzIHtcclxuXHRcclxuXHRcclxuXHRvbkZvcm1SZXNldCQgPSBjcmVhdGVFZmZlY3QoKCkgPT5cclxuXHRcdFx0dGhpcy5hY3Rpb25zJC5waXBlKG9mVHlwZShmb3Jtc0FjdGlvbnMucmVzZXRGb3JtKSxcclxuXHRcdFx0XHR0YXAoKCkgPT4gdGhpcy5mb3JtU2VydmljZS5yZXNldEZvcm0kLm5leHQoKSlcclxuXHRcdFx0KSxcclxuXHRcdHsgZGlzcGF0Y2g6IGZhbHNlIH1cclxuXHQpO1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcclxuXHRcdHByaXZhdGUgZm9ybVNlcnZpY2U6IEZvcm1TZXJ2aWNlXHJcblx0KSB7IH1cclxufVxyXG4iXX0=