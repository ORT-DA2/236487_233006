import { Component, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/inputtextarea";
export class TextAreaFieldComponent {
    constructor() {
        this.isReadOnly = false;
        this.placeholder = "";
        this.isDisabled = false;
        this.formControl = new FormControl('');
        this.onChange = (value) => { };
        this.onTouched = () => { };
        this._componentDestroyed$ = new Subject();
    }
    ngOnInit() {
        this.formControl.valueChanges
            .pipe(takeUntil(this._componentDestroyed$))
            .subscribe(value => {
            this.onChange(value);
        });
    }
    ngOnDestroy() {
        this._componentDestroyed$.next();
        this._componentDestroyed$.complete();
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
        isDisabled ? this.formControl.disable({ emitEvent: false }) : this.formControl.enable({ emitEvent: false });
    }
    onBlur() {
        this.onTouched();
    }
}
TextAreaFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextAreaFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TextAreaFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TextAreaFieldComponent, selector: "custom-text-area-field", inputs: { isReadOnly: ["readonly", "isReadOnly"], placeholder: "placeholder", inputId: "inputId" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextAreaFieldComponent,
            multi: true,
        },
    ], ngImport: i0, template: "<textarea\r\n  *ngIf=\"!isReadOnly; else readOnlyTemplate\"\r\n  [formControl]=\"formControl\"\r\n  pInputTextarea\r\n  [id]=\"this.inputId\"\r\n  [placeholder]=\"this.placeholder\"\r\n  (blur)=\"onBlur()\"\r\n  rows=\"5\"\r\n  cols=\"30\"\r\n>\r\n</textarea>\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n    >{{ this.formControl.value }}</span\r\n    >\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.InputTextarea, selector: "[pInputTextarea]", inputs: ["autoResize"], outputs: ["onResize"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextAreaFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-text-area-field', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: TextAreaFieldComponent,
                            multi: true,
                        },
                    ], template: "<textarea\r\n  *ngIf=\"!isReadOnly; else readOnlyTemplate\"\r\n  [formControl]=\"formControl\"\r\n  pInputTextarea\r\n  [id]=\"this.inputId\"\r\n  [placeholder]=\"this.placeholder\"\r\n  (blur)=\"onBlur()\"\r\n  rows=\"5\"\r\n  cols=\"30\"\r\n>\r\n</textarea>\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n    >{{ this.formControl.value }}</span\r\n    >\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { isReadOnly: [{
                type: Input,
                args: ['readonly']
            }], placeholder: [{
                type: Input
            }], inputId: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy90ZXh0LWFyZWEtZmllbGQvdGV4dC1hcmVhLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy90ZXh0LWFyZWEtZmllbGQvdGV4dC1hcmVhLWZpZWxkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUNsRSxPQUFPLEVBQXVCLFdBQVcsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7OztBQWE3QixNQUFNLE9BQU8sc0JBQXNCO0lBY2pDO1FBYm1CLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDdEMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHMUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixnQkFBVyxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUvQyxhQUFRLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNqQyxjQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRWIseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUVuQyxDQUFDO0lBRWpCLFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVk7YUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUMxQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFFLFVBQW1CO1FBQ25DLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzttSEEvQ1Usc0JBQXNCO3VHQUF0QixzQkFBc0IscUpBUnRCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLDBCQ2RILGlxQkF5QkE7MkZEVGEsc0JBQXNCO2tCQVhsQyxTQUFTOytCQUNFLHdCQUF3QixhQUV2Qjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLHdCQUF3Qjs0QkFDbkMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7MEVBR2tCLFVBQVU7c0JBQTVCLEtBQUs7dUJBQUMsVUFBVTtnQkFDUixXQUFXO3NCQUFuQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHt0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY3VzdG9tLXRleHQtYXJlYS1maWVsZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RleHQtYXJlYS1maWVsZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogVGV4dEFyZWFGaWVsZENvbXBvbmVudCxcclxuICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUZXh0QXJlYUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBASW5wdXQoJ3JlYWRvbmx5JykgaXNSZWFkT25seTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuICBASW5wdXQoKSBpbnB1dElkICE6IHN0cmluZztcclxuXHJcbiAgaXNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xyXG5cclxuICBvbkNoYW5nZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7fTtcclxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50RGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXNcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2NvbXBvbmVudERlc3Ryb3llZCQpKVxyXG4gICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2NvbXBvbmVudERlc3Ryb3llZCQubmV4dCgpO1xyXG4gICAgdGhpcy5fY29tcG9uZW50RGVzdHJveWVkJC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlzRGlzYWJsZWQgPyB0aGlzLmZvcm1Db250cm9sLmRpc2FibGUoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pIDogdGhpcy5mb3JtQ29udHJvbC5lbmFibGUoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gIH1cclxuXHJcbiAgb25CbHVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICB9XHJcbn1cclxuIiwiPHRleHRhcmVhXHJcbiAgKm5nSWY9XCIhaXNSZWFkT25seTsgZWxzZSByZWFkT25seVRlbXBsYXRlXCJcclxuICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxyXG4gIHBJbnB1dFRleHRhcmVhXHJcbiAgW2lkXT1cInRoaXMuaW5wdXRJZFwiXHJcbiAgW3BsYWNlaG9sZGVyXT1cInRoaXMucGxhY2Vob2xkZXJcIlxyXG4gIChibHVyKT1cIm9uQmx1cigpXCJcclxuICByb3dzPVwiNVwiXHJcbiAgY29scz1cIjMwXCJcclxuPlxyXG48L3RleHRhcmVhPlxyXG5cclxuPG5nLXRlbXBsYXRlICNyZWFkT25seVRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJyZWFkLW9ubHktdGVtcGxhdGVcIj5cclxuICAgIDxzcGFuXHJcbiAgICAgICpuZ0lmPVwidGhpcy5mb3JtQ29udHJvbC52YWx1ZTsgZWxzZSBlbXB0eVZhbHVlVGVtcGxhdGVcIlxyXG4gICAgICBjbGFzcz1cInJlYWQtb25seS10ZW1wbGF0ZV9fdmFsdWVcIlxyXG4gICAgPnt7IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgfX08L3NwYW5cclxuICAgID5cclxuICA8L2Rpdj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjZW1wdHlWYWx1ZVRlbXBsYXRlPlxyXG4gIDxzcGFuIGNsYXNzPVwicmVhZC1vbmx5LXRlbXBsYXRlX192YWx1ZS0tZW1wdHlcIj4tPC9zcGFuPlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=