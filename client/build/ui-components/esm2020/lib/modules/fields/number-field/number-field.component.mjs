// Angular Core
import { Component, Input } from '@angular/core';
// Angular Forms
import { FormControl, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/inputnumber";
export class NumberFieldComponent {
    constructor() {
        // P-Input API
        this.placeholder = "";
        this.minFractionDigits = 0;
        this.maxFractionDigits = 0;
        this.min = Number.MIN_VALUE;
        this.max = Number.MAX_VALUE;
        this.maxLength = 0;
        this.locale = 'de-DE';
        this.prefix = '';
        this.suffix = '';
        this.useGrouping = true;
        // Custom SBI API
        this.isReadOnly = false;
        // Reference to the formControl that Im accessing
        // (this is the value of the formControl inside the p-inputNumber
        this.formControl = new FormControl(null);
        this.isDisabled = false;
        this.onChange = (value) => { };
        this.onTouched = () => { };
        this._destroyed$ = new Subject();
    }
    set disabled(disabled) {
        disabled ? this._disableFormControl() : this._enableFormControl();
    }
    ngOnInit() {
        this.formControl.valueChanges
            .pipe(takeUntil(this._destroyed$))
            .subscribe(value => {
            this.onChange(value);
        });
    }
    ngOnDestroy() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
    writeValue(value) {
        if (value)
            this.formControl.setValue(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        disabled ? this._disableFormControl() : this._enableFormControl();
    }
    // On browser Blur event Im marking my formControl as touched
    onBlur() {
        this.onTouched();
    }
    _enableFormControl() {
        this.formControl.enable({ emitEvent: false });
    }
    _disableFormControl() {
        this.formControl.disable({ emitEvent: false });
    }
}
NumberFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NumberFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NumberFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: NumberFieldComponent, selector: "custom-number-field", inputs: { placeholder: "placeholder", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", min: "min", max: "max", maxLength: "maxLength", locale: "locale", prefix: "prefix", suffix: "suffix", disabled: "disabled", useGrouping: "useGrouping", inputId: "inputId", isReadOnly: ["readonly", "isReadOnly"] }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: NumberFieldComponent,
            multi: true,
        },
    ], ngImport: i0, template: "<p-inputNumber\r\n  *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n  [formControl]=\"this.formControl\"\r\n  [inputId]=\"this.inputId\"\r\n  [placeholder]=\"this.placeholder\"\r\n  [locale]=\"this.locale\"\r\n  [minFractionDigits]=\"this.minFractionDigits\"\r\n  [maxFractionDigits]=\"this.maxFractionDigits\"\r\n  [min]=\"this.min\"\r\n  [max]=\"this.max\"\r\n  [prefix]=\"this.prefix\"\r\n  [suffix]=\"this.suffix\"\r\n  (onBlur)=\"onBlur()\"\r\n></p-inputNumber>\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n      >{{this.prefix}} {{ this.formControl.value }} {{this.suffix}}</span\r\n    >\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i3.InputNumber, selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "showClear", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown", "onClear"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NumberFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-number-field', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: NumberFieldComponent,
                            multi: true,
                        },
                    ], template: "<p-inputNumber\r\n  *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n  [formControl]=\"this.formControl\"\r\n  [inputId]=\"this.inputId\"\r\n  [placeholder]=\"this.placeholder\"\r\n  [locale]=\"this.locale\"\r\n  [minFractionDigits]=\"this.minFractionDigits\"\r\n  [maxFractionDigits]=\"this.maxFractionDigits\"\r\n  [min]=\"this.min\"\r\n  [max]=\"this.max\"\r\n  [prefix]=\"this.prefix\"\r\n  [suffix]=\"this.suffix\"\r\n  (onBlur)=\"onBlur()\"\r\n></p-inputNumber>\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n      >{{this.prefix}} {{ this.formControl.value }} {{this.suffix}}</span\r\n    >\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n" }]
        }], propDecorators: { placeholder: [{
                type: Input
            }], minFractionDigits: [{
                type: Input
            }], maxFractionDigits: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], locale: [{
                type: Input
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], disabled: [{
                type: Input
            }], useGrouping: [{
                type: Input
            }], inputId: [{
                type: Input
            }], isReadOnly: [{
                type: Input,
                args: ['readonly']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy9udW1iZXItZmllbGQvbnVtYmVyLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy9udW1iZXItZmllbGQvbnVtYmVyLWZpZWxkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7QUFDZixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsZ0JBQWdCO0FBQ2hCLE9BQU8sRUFFTCxXQUFXLEVBQ1gsaUJBQWlCLEdBQ2xCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBYS9CLE1BQU0sT0FBTyxvQkFBb0I7SUFYakM7UUFZRSxjQUFjO1FBQ0wsZ0JBQVcsR0FBVyxFQUFFLENBQUE7UUFFeEIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUV0QixRQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUN2QixRQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUV2QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsV0FBTSxHQUFHLE9BQU8sQ0FBQztRQUVqQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUtaLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRzVCLGlCQUFpQjtRQUNFLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFdEMs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QkFHYSxVQUFVO3NCQUE1QixLQUFLO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIENvcmVcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gQW5ndWxhciBGb3Jtc1xyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2N1c3RvbS1udW1iZXItZmllbGQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9udW1iZXItZmllbGQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IE51bWJlckZpZWxkQ29tcG9uZW50LFxyXG4gICAgICBtdWx0aTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE51bWJlckZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgIE9uSW5pdCwgT25EZXN0cm95LENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAvLyBQLUlucHV0IEFQSVxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiXHJcblxyXG4gIEBJbnB1dCgpIG1pbkZyYWN0aW9uRGlnaXRzID0gMDtcclxuICBASW5wdXQoKSBtYXhGcmFjdGlvbkRpZ2l0cyA9IDA7XHJcblxyXG4gIEBJbnB1dCgpIG1pbiA9IE51bWJlci5NSU5fVkFMVUU7XHJcbiAgQElucHV0KCkgbWF4ID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgQElucHV0KCkgbWF4TGVuZ3RoID0gMDtcclxuICBASW5wdXQoKSBsb2NhbGUgPSAnZGUtREUnO1xyXG5cclxuICBASW5wdXQoKSBwcmVmaXggPSAnJztcclxuICBASW5wdXQoKSBzdWZmaXggPSAnJztcclxuICBASW5wdXQoKSBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIGRpc2FibGVkID8gdGhpcy5fZGlzYWJsZUZvcm1Db250cm9sKCkgOiB0aGlzLl9lbmFibGVGb3JtQ29udHJvbCgpXHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSB1c2VHcm91cGluZyA9IHRydWU7XHJcbiAgQElucHV0KCkgaW5wdXRJZCE6IHN0cmluZztcclxuXHJcbiAgLy8gQ3VzdG9tIFNCSSBBUElcclxuICBASW5wdXQoJ3JlYWRvbmx5JykgaXNSZWFkT25seSA9IGZhbHNlO1xyXG5cclxuICAvLyBSZWZlcmVuY2UgdG8gdGhlIGZvcm1Db250cm9sIHRoYXQgSW0gYWNjZXNzaW5nXHJcbiAgLy8gKHRoaXMgaXMgdGhlIHZhbHVlIG9mIHRoZSBmb3JtQ29udHJvbCBpbnNpZGUgdGhlIHAtaW5wdXROdW1iZXJcclxuICBwdWJsaWMgZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2w8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgcHVibGljIGlzRGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIG9uQ2hhbmdlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKSA9PiB7fTtcclxuICBwdWJsaWMgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIHByaXZhdGUgX2Rlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQkKSlcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZGVzdHJveWVkJC5uZXh0KCk7XHJcbiAgICB0aGlzLl9kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZih2YWx1ZSkgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlPyhkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgZGlzYWJsZWQgPyB0aGlzLl9kaXNhYmxlRm9ybUNvbnRyb2woKSA6IHRoaXMuX2VuYWJsZUZvcm1Db250cm9sKCk7XHJcbiAgfVxyXG5cclxuICAvLyBPbiBicm93c2VyIEJsdXIgZXZlbnQgSW0gbWFya2luZyBteSBmb3JtQ29udHJvbCBhcyB0b3VjaGVkXHJcbiAgcHVibGljIG9uQmx1cigpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9lbmFibGVGb3JtQ29udHJvbCgpIDogdm9pZHtcclxuICAgIHRoaXMuZm9ybUNvbnRyb2wuZW5hYmxlKHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rpc2FibGVGb3JtQ29udHJvbCgpIDogdm9pZCB7XHJcbiAgICB0aGlzLmZvcm1Db250cm9sLmRpc2FibGUoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8cC1pbnB1dE51bWJlclxyXG4gICpuZ0lmPVwiIXRoaXMuaXNSZWFkT25seTsgZWxzZSByZWFkT25seVRlbXBsYXRlXCJcclxuICBbZm9ybUNvbnRyb2xdPVwidGhpcy5mb3JtQ29udHJvbFwiXHJcbiAgW2lucHV0SWRdPVwidGhpcy5pbnB1dElkXCJcclxuICBbcGxhY2Vob2xkZXJdPVwidGhpcy5wbGFjZWhvbGRlclwiXHJcbiAgW2xvY2FsZV09XCJ0aGlzLmxvY2FsZVwiXHJcbiAgW21pbkZyYWN0aW9uRGlnaXRzXT1cInRoaXMubWluRnJhY3Rpb25EaWdpdHNcIlxyXG4gIFttYXhGcmFjdGlvbkRpZ2l0c109XCJ0aGlzLm1heEZyYWN0aW9uRGlnaXRzXCJcclxuICBbbWluXT1cInRoaXMubWluXCJcclxuICBbbWF4XT1cInRoaXMubWF4XCJcclxuICBbcHJlZml4XT1cInRoaXMucHJlZml4XCJcclxuICBbc3VmZml4XT1cInRoaXMuc3VmZml4XCJcclxuICAob25CbHVyKT1cIm9uQmx1cigpXCJcclxuPjwvcC1pbnB1dE51bWJlcj5cclxuPG5nLXRlbXBsYXRlICNyZWFkT25seVRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJyZWFkLW9ubHktdGVtcGxhdGVcIj5cclxuICAgIDxzcGFuXHJcbiAgICAgICpuZ0lmPVwidGhpcy5mb3JtQ29udHJvbC52YWx1ZTsgZWxzZSBlbXB0eVZhbHVlVGVtcGxhdGVcIlxyXG4gICAgICBjbGFzcz1cInJlYWQtb25seS10ZW1wbGF0ZV9fdmFsdWVcIlxyXG4gICAgICA+e3t0aGlzLnByZWZpeH19IHt7IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgfX0ge3t0aGlzLnN1ZmZpeH19PC9zcGFuXHJcbiAgICA+XHJcbiAgPC9kaXY+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48bmctdGVtcGxhdGUgI2VtcHR5VmFsdWVUZW1wbGF0ZT5cclxuICA8c3BhbiBjbGFzcz1cInJlYWQtb25seS10ZW1wbGF0ZV9fdmFsdWUtLWVtcHR5XCI+LTwvc3Bhbj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19