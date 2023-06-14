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
import * as i3 from "primeng/calendar";
export class DateFieldComponent {
    constructor() {
        this.isReadOnly = false;
        this.disabled = false;
        this.showIcon = true;
        this.minDate = new Date(0);
        this.dateFormat = 'dd/mm/yy';
        this.view = 'date';
        this.formControl = new FormControl(null);
        this.isDisabled = false;
        this.onChange = (value) => { };
        this.onTouched = () => { };
        this._componentDestroyed$ = new Subject();
    }
    ngOnInit() {
        this.formControl.valueChanges
            .pipe(takeUntil(this._componentDestroyed$))
            .subscribe((value) => this.onChange(value));
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
DateFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DateFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DateFieldComponent, selector: "custom-date-field", inputs: { isReadOnly: ["readonly", "isReadOnly"], inputId: "inputId", disabled: "disabled", showIcon: "showIcon", minDate: ["min", "minDate"], maxDate: ["max", "maxDate"], dateFormat: ["format", "dateFormat"], view: "view", placeholder: "placeholder" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DateFieldComponent,
            multi: true,
        },
    ], ngImport: i0, template: "<p-calendar\r\n  *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n  [formControl]=\"this.formControl\"\r\n  [inputId]=\"this.inputId\"\r\n  [dateFormat]=\"this.dateFormat\"\r\n  [placeholder]=\"this.placeholder\"\r\n  [showIcon]=\"this.showIcon\"\r\n  [minDate]=\"this.minDate\"\r\n  [maxDate]=\"this.maxDate\"\r\n  [view]=\"this.view\"\r\n  [disabled]=\"this.disabled\"\r\n  (onBlur)=\"onBlur()\"\r\n  class=\"treetableDate\"\r\n>\r\n</p-calendar>\r\n\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n    >\r\n      {{ this.formControl.value | date : 'dd/MM/yyyy' }}\r\n    </span>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n", styles: [""], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i3.Calendar, selector: "p-calendar", inputs: ["style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "iconAriaLabel", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "view", "defaultDate", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "locale"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }, { kind: "pipe", type: i1.DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-date-field', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: DateFieldComponent,
                            multi: true,
                        },
                    ], template: "<p-calendar\r\n  *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n  [formControl]=\"this.formControl\"\r\n  [inputId]=\"this.inputId\"\r\n  [dateFormat]=\"this.dateFormat\"\r\n  [placeholder]=\"this.placeholder\"\r\n  [showIcon]=\"this.showIcon\"\r\n  [minDate]=\"this.minDate\"\r\n  [maxDate]=\"this.maxDate\"\r\n  [view]=\"this.view\"\r\n  [disabled]=\"this.disabled\"\r\n  (onBlur)=\"onBlur()\"\r\n  class=\"treetableDate\"\r\n>\r\n</p-calendar>\r\n\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n    >\r\n      {{ this.formControl.value | date : 'dd/MM/yyyy' }}\r\n    </span>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n" }]
        }], propDecorators: { isReadOnly: [{
                type: Input,
                args: ['readonly']
            }], inputId: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], minDate: [{
                type: Input,
                args: ['min']
            }], maxDate: [{
                type: Input,
                args: ['max']
            }], dateFormat: [{
                type: Input,
                args: ['format']
            }], view: [{
                type: Input
            }], placeholder: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy91aS1jb21wb25lbnRzL3NyYy9saWIvbW9kdWxlcy9maWVsZHMvZGF0ZS1maWVsZC9kYXRlLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy9kYXRlLWZpZWxkL2RhdGUtZmllbGQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtBQUNmLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxnQkFBZ0I7QUFDaEIsT0FBTyxFQUVMLFdBQVcsRUFDWCxpQkFBaUIsR0FDbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4QixPQUFPO0FBQ1AsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBZTNDLE1BQU0sT0FBTyxrQkFBa0I7SUFiL0I7UUFnQnFCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFN0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ1gsWUFBTyxHQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDaEMsU0FBSSxHQUFxQixNQUFNLENBQUM7UUFHbEMsZ0JBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBYyxJQUFJLENBQUMsQ0FBQztRQUNqRCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRW5CLGFBQVEsR0FBRyxDQUFDLEtBQWtCLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN0QyxjQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXBCLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7S0F3Q3BEO0lBdENDLFFBQVE7UUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVk7YUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUMxQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVNLFVBQVUsQ0FBQyxLQUFXO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxFQUFPO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxFQUFPO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxnQkFBZ0IsQ0FBRSxVQUFtQjtRQUMxQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUN0RSxDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7OytHQTNEVSxrQkFBa0I7bUdBQWxCLGtCQUFrQiwwU0FWbEI7UUFDVDtZQUNFLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLGtCQUFrQjtZQUMvQixLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsMEJDdkJILHM0QkErQkE7MkZESmEsa0JBQWtCO2tCQWI5QixTQUFTOytCQUNFLG1CQUFtQixhQUVsQjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLG9CQUFvQjs0QkFDL0IsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7OEJBT2tCLFVBQVU7c0JBQTVCLEtBQUs7dUJBQUMsVUFBVTtnQkFDUixPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNRLE9BQU87c0JBQXBCLEtBQUs7dUJBQUMsS0FBSztnQkFDRSxPQUFPO3NCQUFwQixLQUFLO3VCQUFDLEtBQUs7Z0JBQ0ssVUFBVTtzQkFBMUIsS0FBSzt1QkFBQyxRQUFRO2dCQUNOLElBQUk7c0JBQVosS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhciBDb3JlXHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIEFuZ3VsYXIgRm9ybXNcclxuaW1wb3J0IHtcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBGb3JtQ29udHJvbCxcclxuICBOR19WQUxVRV9BQ0NFU1NPUixcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbi8vIEludGVyZmFjZXNcclxuaW1wb3J0IHsgQ2FsZW5kYXJUeXBlVmlldyB9IGZyb20gJ3ByaW1lbmcvY2FsZW5kYXInO1xyXG4vLyBSeEpzXHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjdXN0b20tZGF0ZS1maWVsZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtZmllbGQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IERhdGVGaWVsZENvbXBvbmVudCxcclxuICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgc3R5bGVzOiBbYFxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlRmllbGRDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvclxyXG57XHJcbiAgQElucHV0KCdyZWFkb25seScpIGlzUmVhZE9ubHkgPSBmYWxzZTtcclxuICBASW5wdXQoKSBpbnB1dElkITogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHNob3dJY29uID0gdHJ1ZTtcclxuICBASW5wdXQoJ21pbicpIG1pbkRhdGU6IERhdGUgPSBuZXcgRGF0ZSgwKTtcclxuICBASW5wdXQoJ21heCcpIG1heERhdGUhOiBEYXRlO1xyXG4gIEBJbnB1dCgnZm9ybWF0JykgZGF0ZUZvcm1hdCA9ICdkZC9tbS95eSc7XHJcbiAgQElucHV0KCkgdmlldzogQ2FsZW5kYXJUeXBlVmlldyA9ICdkYXRlJztcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciE6IHN0cmluZztcclxuXHJcbiAgcHVibGljIGZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sPERhdGUgfCBudWxsPihudWxsKTtcclxuICBwdWJsaWMgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgb25DaGFuZ2UgPSAodmFsdWU6IERhdGUgfCBudWxsKSA9PiB7fTtcclxuICBwdWJsaWMgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIHByaXZhdGUgX2NvbXBvbmVudERlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9jb21wb25lbnREZXN0cm95ZWQkKSlcclxuICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+IHRoaXMub25DaGFuZ2UodmFsdWUpKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fY29tcG9uZW50RGVzdHJveWVkJC5uZXh0KCk7XHJcbiAgICB0aGlzLl9jb21wb25lbnREZXN0cm95ZWQkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogRGF0ZSk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpc0Rpc2FibGVkID8gdGhpcy5fZGlzYWJsZUZvcm1Db250cm9sKCkgOiB0aGlzLl9lbmFibGVGb3JtQ29udHJvbCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQmx1cigpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9lbmFibGVGb3JtQ29udHJvbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9ybUNvbnRyb2wuZW5hYmxlKHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rpc2FibGVGb3JtQ29udHJvbCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZm9ybUNvbnRyb2wuZGlzYWJsZSh7IGVtaXRFdmVudDogZmFsc2UgfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxwLWNhbGVuZGFyXHJcbiAgKm5nSWY9XCIhdGhpcy5pc1JlYWRPbmx5OyBlbHNlIHJlYWRPbmx5VGVtcGxhdGVcIlxyXG4gIFtmb3JtQ29udHJvbF09XCJ0aGlzLmZvcm1Db250cm9sXCJcclxuICBbaW5wdXRJZF09XCJ0aGlzLmlucHV0SWRcIlxyXG4gIFtkYXRlRm9ybWF0XT1cInRoaXMuZGF0ZUZvcm1hdFwiXHJcbiAgW3BsYWNlaG9sZGVyXT1cInRoaXMucGxhY2Vob2xkZXJcIlxyXG4gIFtzaG93SWNvbl09XCJ0aGlzLnNob3dJY29uXCJcclxuICBbbWluRGF0ZV09XCJ0aGlzLm1pbkRhdGVcIlxyXG4gIFttYXhEYXRlXT1cInRoaXMubWF4RGF0ZVwiXHJcbiAgW3ZpZXddPVwidGhpcy52aWV3XCJcclxuICBbZGlzYWJsZWRdPVwidGhpcy5kaXNhYmxlZFwiXHJcbiAgKG9uQmx1cik9XCJvbkJsdXIoKVwiXHJcbiAgY2xhc3M9XCJ0cmVldGFibGVEYXRlXCJcclxuPlxyXG48L3AtY2FsZW5kYXI+XHJcblxyXG5cclxuPG5nLXRlbXBsYXRlICNyZWFkT25seVRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJyZWFkLW9ubHktdGVtcGxhdGVcIj5cclxuICAgIDxzcGFuXHJcbiAgICAgICpuZ0lmPVwidGhpcy5mb3JtQ29udHJvbC52YWx1ZTsgZWxzZSBlbXB0eVZhbHVlVGVtcGxhdGVcIlxyXG4gICAgICBjbGFzcz1cInJlYWQtb25seS10ZW1wbGF0ZV9fdmFsdWVcIlxyXG4gICAgPlxyXG4gICAgICB7eyB0aGlzLmZvcm1Db250cm9sLnZhbHVlIHwgZGF0ZSA6ICdkZC9NTS95eXl5JyB9fVxyXG4gICAgPC9zcGFuPlxyXG4gIDwvZGl2PlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuPG5nLXRlbXBsYXRlICNlbXB0eVZhbHVlVGVtcGxhdGU+XHJcbiAgPHNwYW4gY2xhc3M9XCJyZWFkLW9ubHktdGVtcGxhdGVfX3ZhbHVlLS1lbXB0eVwiPi08L3NwYW4+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==