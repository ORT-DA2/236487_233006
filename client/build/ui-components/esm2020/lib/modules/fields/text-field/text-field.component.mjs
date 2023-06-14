// Angular Core
import { Component, Input } from '@angular/core';
// Angular Forms
import { FormControl, NG_VALUE_ACCESSOR, } from '@angular/forms';
// RxJs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/inputtext";
export class TextFieldComponent {
    constructor() {
        this.placeholder = '';
        this.isReadOnly = false;
        this.disabled = false;
        this.iconPosition = null;
        this.type = "text";
        this.icon = null;
        this.formControl = new FormControl('');
        this._componentDestroyed$ = new Subject();
        this.onChange = (value) => { };
        this.onTouched = () => { };
    }
    ngOnInit() {
        this.formControl.valueChanges
            .pipe(takeUntil(this._componentDestroyed$))
            .subscribe((value) => {
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
        isDisabled ? this._disableFormControl() : this._enableFormControl();
    }
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
TextFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TextFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TextFieldComponent, selector: "custom-text-field", inputs: { placeholder: "placeholder", inputId: "inputId", isReadOnly: ["readonly", "isReadOnly"], disabled: "disabled", iconPosition: "iconPosition", type: "type", icon: "icon", loading$: "loading$" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextFieldComponent,
            multi: true,
        },
    ], ngImport: i0, template: "<span\r\n  [class.p-input-icon-left]=\"this.iconPosition === 'left' || (this.icon && this.iconPosition !== 'right')\"\r\n  [class.p-input-icon-right]=\"this.iconPosition === 'right'\"\r\n>\r\n  <i *ngIf=\"(this.loading$ | async) === 'PENDING'\" class=\"pi pi-spinner pi-spin\"></i>\r\n  <i *ngIf=\"(this.loading$ | async) !== 'PENDING'&& this.icon\" class=\"pi {{ icon }}\"></i>\r\n\r\n  <input\r\n    *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n    [formControl]=\"this.formControl\"\r\n    [type]=\"this.type\"\r\n    [id]=\"this.inputId\"\r\n    [placeholder]=\"this.placeholder\"\r\n    [attr.disabled]=\"this.disabled ? true : null\"\r\n    class=\"input\"\r\n    pInputText\r\n    (blur)=\"onBlur()\"\r\n  />\r\n</span>\r\n\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n      >{{ this.formControl.value }}</span\r\n    >\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.InputText, selector: "[pInputText]" }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-text-field', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: TextFieldComponent,
                            multi: true,
                        },
                    ], template: "<span\r\n  [class.p-input-icon-left]=\"this.iconPosition === 'left' || (this.icon && this.iconPosition !== 'right')\"\r\n  [class.p-input-icon-right]=\"this.iconPosition === 'right'\"\r\n>\r\n  <i *ngIf=\"(this.loading$ | async) === 'PENDING'\" class=\"pi pi-spinner pi-spin\"></i>\r\n  <i *ngIf=\"(this.loading$ | async) !== 'PENDING'&& this.icon\" class=\"pi {{ icon }}\"></i>\r\n\r\n  <input\r\n    *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n    [formControl]=\"this.formControl\"\r\n    [type]=\"this.type\"\r\n    [id]=\"this.inputId\"\r\n    [placeholder]=\"this.placeholder\"\r\n    [attr.disabled]=\"this.disabled ? true : null\"\r\n    class=\"input\"\r\n    pInputText\r\n    (blur)=\"onBlur()\"\r\n  />\r\n</span>\r\n\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n      >{{ this.formControl.value }}</span\r\n    >\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n" }]
        }], propDecorators: { placeholder: [{
                type: Input
            }], inputId: [{
                type: Input
            }], isReadOnly: [{
                type: Input,
                args: ['readonly']
            }], disabled: [{
                type: Input
            }], iconPosition: [{
                type: Input
            }], type: [{
                type: Input
            }], icon: [{
                type: Input
            }], loading$: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy91aS1jb21wb25lbnRzL3NyYy9saWIvbW9kdWxlcy9maWVsZHMvdGV4dC1maWVsZC90ZXh0LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy90ZXh0LWZpZWxkL3RleHQtZmllbGQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtBQUNmLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxnQkFBZ0I7QUFDaEIsT0FBTyxFQUVMLFdBQVcsRUFDWCxpQkFBaUIsR0FDbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPO0FBQ1AsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBYTNDLE1BQU0sT0FBTyxrQkFBa0I7SUFYL0I7UUFhVyxnQkFBVyxHQUF3QixFQUFFLENBQUM7UUFFNUIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUM3QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGlCQUFZLEdBQXVDLElBQUksQ0FBQztRQUN4RCxTQUFJLEdBQTZDLE1BQU0sQ0FBQztRQUN4RCxTQUFJLEdBQThCLElBQUksQ0FBQztRQUl6QyxnQkFBVyxHQUFnQixJQUFJLFdBQVcsQ0FDL0MsRUFBRSxDQUNILENBQUM7UUFFTSx5QkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBZTVDLGFBQVEsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7S0E2QjdCO0lBM0NDLFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVk7YUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUMxQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFLTSxVQUFVLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sZ0JBQWdCLENBQUMsRUFBTztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0saUJBQWlCLENBQUMsRUFBTztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0sZ0JBQWdCLENBQUUsVUFBbUI7UUFDMUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDOzsrR0E1RFUsa0JBQWtCO21HQUFsQixrQkFBa0Isc1BBUmxCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLDBCQ3JCSCxrb0NBa0NBOzJGRFhhLGtCQUFrQjtrQkFYOUIsU0FBUzsrQkFDRSxtQkFBbUIsYUFFbEI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxvQkFBb0I7NEJBQy9CLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGOzhCQUlRLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNhLFVBQVU7c0JBQTVCLEtBQUs7dUJBQUMsVUFBVTtnQkFDUixRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhciBDb3JlXHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIEFuZ3VsYXIgRm9ybXNcclxuaW1wb3J0IHtcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBGb3JtQ29udHJvbCxcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbi8vIFJ4SnNcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2N1c3RvbS10ZXh0LWZpZWxkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGV4dC1maWVsZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogVGV4dEZpZWxkQ29tcG9uZW50LFxyXG4gICAgICBtdWx0aTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRleHRGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgOiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnJztcclxuICBASW5wdXQoKSBpbnB1dElkITogc3RyaW5nO1xyXG4gIEBJbnB1dCgncmVhZG9ubHknKSBpc1JlYWRPbmx5ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBpY29uUG9zaXRpb246ICdyaWdodCcgfCAnbGVmdCd8IHVuZGVmaW5lZCB8IG51bGwgPSBudWxsO1xyXG4gIEBJbnB1dCgpIHR5cGU6ICd0ZXh0JyB8ICdwYXNzd29yZCcgfCAnZW1haWwnfCB1bmRlZmluZWQgPSBcInRleHRcIjtcclxuICBASW5wdXQoKSBpY29uOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsID0gbnVsbDtcclxuICBASW5wdXQoKSBsb2FkaW5nJCAhOiBPYnNlcnZhYmxlPGFueT5cclxuICBcclxuICBcclxuICBwdWJsaWMgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sPHN0cmluZyB8IG51bGw+KFxyXG4gICAgJycsXHJcbiAgKTtcclxuXHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50RGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXNcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2NvbXBvbmVudERlc3Ryb3llZCQpKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fY29tcG9uZW50RGVzdHJveWVkJC5uZXh0KCk7XHJcbiAgICB0aGlzLl9jb21wb25lbnREZXN0cm95ZWQkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25DaGFuZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge307XHJcbiAgcHVibGljIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG5cclxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlzRGlzYWJsZWQgPyB0aGlzLl9kaXNhYmxlRm9ybUNvbnRyb2woKSA6IHRoaXMuX2VuYWJsZUZvcm1Db250cm9sKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25CbHVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2VuYWJsZUZvcm1Db250cm9sKCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtQ29udHJvbC5lbmFibGUoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZUZvcm1Db250cm9sKCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtQ29udHJvbC5kaXNhYmxlKHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICB9XHJcbn1cclxuIiwiPHNwYW5cclxuICBbY2xhc3MucC1pbnB1dC1pY29uLWxlZnRdPVwidGhpcy5pY29uUG9zaXRpb24gPT09ICdsZWZ0JyB8fCAodGhpcy5pY29uICYmIHRoaXMuaWNvblBvc2l0aW9uICE9PSAncmlnaHQnKVwiXHJcbiAgW2NsYXNzLnAtaW5wdXQtaWNvbi1yaWdodF09XCJ0aGlzLmljb25Qb3NpdGlvbiA9PT0gJ3JpZ2h0J1wiXHJcbj5cclxuICA8aSAqbmdJZj1cIih0aGlzLmxvYWRpbmckIHwgYXN5bmMpID09PSAnUEVORElORydcIiBjbGFzcz1cInBpIHBpLXNwaW5uZXIgcGktc3BpblwiPjwvaT5cclxuICA8aSAqbmdJZj1cIih0aGlzLmxvYWRpbmckIHwgYXN5bmMpICE9PSAnUEVORElORycmJiB0aGlzLmljb25cIiBjbGFzcz1cInBpIHt7IGljb24gfX1cIj48L2k+XHJcblxyXG4gIDxpbnB1dFxyXG4gICAgKm5nSWY9XCIhdGhpcy5pc1JlYWRPbmx5OyBlbHNlIHJlYWRPbmx5VGVtcGxhdGVcIlxyXG4gICAgW2Zvcm1Db250cm9sXT1cInRoaXMuZm9ybUNvbnRyb2xcIlxyXG4gICAgW3R5cGVdPVwidGhpcy50eXBlXCJcclxuICAgIFtpZF09XCJ0aGlzLmlucHV0SWRcIlxyXG4gICAgW3BsYWNlaG9sZGVyXT1cInRoaXMucGxhY2Vob2xkZXJcIlxyXG4gICAgW2F0dHIuZGlzYWJsZWRdPVwidGhpcy5kaXNhYmxlZCA/IHRydWUgOiBudWxsXCJcclxuICAgIGNsYXNzPVwiaW5wdXRcIlxyXG4gICAgcElucHV0VGV4dFxyXG4gICAgKGJsdXIpPVwib25CbHVyKClcIlxyXG4gIC8+XHJcbjwvc3Bhbj5cclxuXHJcblxyXG48bmctdGVtcGxhdGUgI3JlYWRPbmx5VGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cInJlYWQtb25seS10ZW1wbGF0ZVwiPlxyXG4gICAgPHNwYW5cclxuICAgICAgKm5nSWY9XCJ0aGlzLmZvcm1Db250cm9sLnZhbHVlOyBlbHNlIGVtcHR5VmFsdWVUZW1wbGF0ZVwiXHJcbiAgICAgIGNsYXNzPVwicmVhZC1vbmx5LXRlbXBsYXRlX192YWx1ZVwiXHJcbiAgICAgID57eyB0aGlzLmZvcm1Db250cm9sLnZhbHVlIH19PC9zcGFuXHJcbiAgICA+XHJcbiAgPC9kaXY+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48bmctdGVtcGxhdGUgI2VtcHR5VmFsdWVUZW1wbGF0ZT5cclxuICA8c3BhbiBjbGFzcz1cInJlYWQtb25seS10ZW1wbGF0ZV9fdmFsdWUtLWVtcHR5XCI+LTwvc3Bhbj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19