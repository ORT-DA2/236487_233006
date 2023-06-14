// Angular Core
import { Component, Input } from '@angular/core';
// Angular Forms
import { FormControl, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/checkbox";
export class CheckboxFieldComponent {
    constructor() {
        this.isReadOnly = false;
        this.label = "";
        this.disabled = false;
        this.componentDestroyed$ = new Subject();
        this.formControl = new FormControl(false);
        this.onChange = (value) => { };
        this.onTouched = () => { };
    }
    ngOnInit() {
        this.formControl.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(value => {
            this.onChange(value);
        });
    }
    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
    writeValue(value) {
        this.formControl.setValue(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this._disableFormControl() : this._enableFormControl();
    }
    onCheckChange() {
        this.onTouched();
    }
    _enableFormControl() {
        this.formControl.enable({ emitEvent: false });
    }
    _disableFormControl() {
        this.formControl.disable({ emitEvent: false });
    }
}
CheckboxFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckboxFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CheckboxFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CheckboxFieldComponent, selector: "custom-checkbox-field", inputs: { isReadOnly: ["readonly", "isReadOnly"], inputId: "inputId", label: "label", disabled: "disabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CheckboxFieldComponent,
            multi: true,
        },
    ], ngImport: i0, template: "<div class=\"checkbox-template\">\r\n  <p-checkbox\r\n    *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n    [binary]=\"true\"\r\n    [disabled]=\"this.disabled\"\r\n    [formControl]=\"this.formControl\"\r\n    [inputId]=\"this.inputId\"\r\n    [label]=\"this.label\"\r\n    (onChange)=\"this.onCheckChange()\"\r\n  >\r\n  </p-checkbox>\r\n</div>\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div>\r\n    <span *ngIf=\"this.formControl.value\"><i class=\"pi pi-check\"></i></span>\r\n    <span *ngIf=\"!this.formControl.value\"><i class=\"pi pi-times\"></i></span>\r\n  </div>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i3.Checkbox, selector: "p-checkbox", inputs: ["value", "name", "disabled", "binary", "label", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "style", "styleClass", "labelStyleClass", "formControl", "checkboxIcon", "readonly", "required", "trueValue", "falseValue"], outputs: ["onChange"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckboxFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-checkbox-field', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: CheckboxFieldComponent,
                            multi: true,
                        },
                    ], template: "<div class=\"checkbox-template\">\r\n  <p-checkbox\r\n    *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n    [binary]=\"true\"\r\n    [disabled]=\"this.disabled\"\r\n    [formControl]=\"this.formControl\"\r\n    [inputId]=\"this.inputId\"\r\n    [label]=\"this.label\"\r\n    (onChange)=\"this.onCheckChange()\"\r\n  >\r\n  </p-checkbox>\r\n</div>\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div>\r\n    <span *ngIf=\"this.formControl.value\"><i class=\"pi pi-check\"></i></span>\r\n    <span *ngIf=\"!this.formControl.value\"><i class=\"pi pi-times\"></i></span>\r\n  </div>\r\n</ng-template>\r\n" }]
        }], propDecorators: { isReadOnly: [{
                type: Input,
                args: ['readonly']
            }], inputId: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdWktY29tcG9uZW50cy9zcmMvbGliL21vZHVsZXMvZmllbGRzL2NoZWNrYm94LWZpZWxkL2NoZWNrYm94LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy9jaGVja2JveC1maWVsZC9jaGVja2JveC1maWVsZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0FBQ2YsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsZ0JBQWdCO0FBQ2hCLE9BQU8sRUFFTCxXQUFXLEVBQ1gsaUJBQWlCLEdBQ2xCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7O0FBYTdCLE1BQU0sT0FBTyxzQkFBc0I7SUFYbkM7UUFhcUIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUU3QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVsQix3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQzNDLGdCQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckMsYUFBUSxHQUFHLENBQUMsS0FBcUIsRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ3pDLGNBQVMsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7S0E0QzdCO0lBMUNDLFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVk7YUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUN6QyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBR00sVUFBVSxDQUFDLEtBQWM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEVBQU87UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEVBQU87UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLGdCQUFnQixDQUFFLFVBQW1CO1FBQzFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFFTSxhQUFhO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7O21IQXJEVSxzQkFBc0I7dUdBQXRCLHNCQUFzQiw4SkFSdEI7UUFDVDtZQUNFLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsMEJDcEJILDhsQkFtQkE7MkZER2Esc0JBQXNCO2tCQVhsQyxTQUFTOytCQUNFLHVCQUF1QixhQUV0Qjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLHdCQUF3Qjs0QkFDbkMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7OEJBSWtCLFVBQVU7c0JBQTVCLEtBQUs7dUJBQUMsVUFBVTtnQkFDUixPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIENvcmVcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBbmd1bGFyIEZvcm1zXHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgRm9ybUNvbnRyb2wsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcbmltcG9ydCB7U3ViamVjdH0gZnJvbSBcInJ4anNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY3VzdG9tLWNoZWNrYm94LWZpZWxkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2hlY2tib3gtZmllbGQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IENoZWNrYm94RmllbGRDb21wb25lbnQsXHJcbiAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBcclxuICBASW5wdXQoJ3JlYWRvbmx5JykgaXNSZWFkT25seSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGlucHV0SWQgITogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGxhYmVsID0gXCJcIjtcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGNvbXBvbmVudERlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gIHB1YmxpYyBmb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChmYWxzZSk7XHJcbiAgXHJcbiAgcHVibGljIG9uQ2hhbmdlID0gKHZhbHVlOiBib29sZWFuIHwgbnVsbCkgPT4ge307XHJcbiAgcHVibGljIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG4gIFxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXNcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuY29tcG9uZW50RGVzdHJveWVkJCkpXHJcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbXBvbmVudERlc3Ryb3llZCQubmV4dCgpO1xyXG4gICAgdGhpcy5jb21wb25lbnREZXN0cm95ZWQkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlzRGlzYWJsZWQgPyB0aGlzLl9kaXNhYmxlRm9ybUNvbnRyb2woKSA6IHRoaXMuX2VuYWJsZUZvcm1Db250cm9sKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25DaGVja0NoYW5nZSgpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9lbmFibGVGb3JtQ29udHJvbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9ybUNvbnRyb2wuZW5hYmxlKHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rpc2FibGVGb3JtQ29udHJvbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZSh7IGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgfVxyXG4gIFxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJjaGVja2JveC10ZW1wbGF0ZVwiPlxyXG4gIDxwLWNoZWNrYm94XHJcbiAgICAqbmdJZj1cIiF0aGlzLmlzUmVhZE9ubHk7IGVsc2UgcmVhZE9ubHlUZW1wbGF0ZVwiXHJcbiAgICBbYmluYXJ5XT1cInRydWVcIlxyXG4gICAgW2Rpc2FibGVkXT1cInRoaXMuZGlzYWJsZWRcIlxyXG4gICAgW2Zvcm1Db250cm9sXT1cInRoaXMuZm9ybUNvbnRyb2xcIlxyXG4gICAgW2lucHV0SWRdPVwidGhpcy5pbnB1dElkXCJcclxuICAgIFtsYWJlbF09XCJ0aGlzLmxhYmVsXCJcclxuICAgIChvbkNoYW5nZSk9XCJ0aGlzLm9uQ2hlY2tDaGFuZ2UoKVwiXHJcbiAgPlxyXG4gIDwvcC1jaGVja2JveD5cclxuPC9kaXY+XHJcblxyXG48bmctdGVtcGxhdGUgI3JlYWRPbmx5VGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxzcGFuICpuZ0lmPVwidGhpcy5mb3JtQ29udHJvbC52YWx1ZVwiPjxpIGNsYXNzPVwicGkgcGktY2hlY2tcIj48L2k+PC9zcGFuPlxyXG4gICAgPHNwYW4gKm5nSWY9XCIhdGhpcy5mb3JtQ29udHJvbC52YWx1ZVwiPjxpIGNsYXNzPVwicGkgcGktdGltZXNcIj48L2k+PC9zcGFuPlxyXG4gIDwvZGl2PlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=