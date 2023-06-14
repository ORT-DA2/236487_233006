import * as i0 from '@angular/core';
import { Component, Input, NgModule, inject, ChangeDetectionStrategy, Injectable, EventEmitter, Output } from '@angular/core';
import * as i3 from 'primeng/inputtext';
import { InputTextModule } from 'primeng/inputtext';
import * as i2 from '@angular/forms';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, map, tap, combineLatest, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from '@angular/common';
import { CommonModule, NgForOf, NgIf, NgSwitch, NgSwitchCase, AsyncPipe, NgSwitchDefault } from '@angular/common';
import * as i3$1 from 'primeng/inputnumber';
import { InputNumberModule } from 'primeng/inputnumber';
import * as i3$2 from 'primeng/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import * as i3$3 from 'primeng/calendar';
import { CalendarModule } from 'primeng/calendar';
import * as i3$4 from 'primeng/multiselect';
import { MultiSelectModule } from 'primeng/multiselect';
import * as i4 from 'primeng/dropdown';
import { DropdownModule } from 'primeng/dropdown';
import * as i3$5 from 'primeng/inputtextarea';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { __awaiter } from 'tslib';
import * as i1$1 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { DragDropModule } from 'primeng/dragdrop';
import { GalleriaModule } from 'primeng/galleria';
import { Router, NavigationStart, RouteConfigLoadStart, NavigationEnd, NavigationError, NavigationCancel, RouteConfigLoadEnd } from '@angular/router';
import * as i2$1 from 'primeng/progressspinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { createActionGroup, props, emptyProps, createFeature, createReducer, on } from '@ngrx/store';
import * as i1$2 from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';

// Angular Core
class TextFieldComponent {
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

// Modules
const modules = [CommonModule, ReactiveFormsModule];
class FieldsModule {
}
FieldsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FieldsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FieldsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FieldsModule, imports: [CommonModule, ReactiveFormsModule], exports: [CommonModule, ReactiveFormsModule] });
FieldsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FieldsModule, imports: [modules, CommonModule, ReactiveFormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FieldsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...modules],
                    exports: [...modules],
                }]
        }] });

// Modules
class TextFieldModule {
}
TextFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextFieldModule, declarations: [TextFieldComponent], imports: [FieldsModule, InputTextModule], exports: [TextFieldComponent] });
TextFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextFieldModule, imports: [FieldsModule, InputTextModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FieldsModule, InputTextModule],
                    declarations: [TextFieldComponent],
                    exports: [TextFieldComponent],
                }]
        }] });

// Angular Core
class NumberFieldComponent {
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
    ], ngImport: i0, template: "<p-inputNumber\r\n  *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n  [formControl]=\"this.formControl\"\r\n  [inputId]=\"this.inputId\"\r\n  [placeholder]=\"this.placeholder\"\r\n  [locale]=\"this.locale\"\r\n  [minFractionDigits]=\"this.minFractionDigits\"\r\n  [maxFractionDigits]=\"this.maxFractionDigits\"\r\n  [min]=\"this.min\"\r\n  [max]=\"this.max\"\r\n  [prefix]=\"this.prefix\"\r\n  [suffix]=\"this.suffix\"\r\n  (onBlur)=\"onBlur()\"\r\n></p-inputNumber>\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n      >{{this.prefix}} {{ this.formControl.value }} {{this.suffix}}</span\r\n    >\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i3$1.InputNumber, selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "showClear", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown", "onClear"] }] });
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

// Modules
class NumberFieldModule {
}
NumberFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NumberFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NumberFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: NumberFieldModule, declarations: [NumberFieldComponent], imports: [FieldsModule, InputNumberModule], exports: [NumberFieldComponent] });
NumberFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NumberFieldModule, imports: [FieldsModule, InputNumberModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NumberFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FieldsModule, InputNumberModule],
                    declarations: [NumberFieldComponent],
                    exports: [NumberFieldComponent],
                }]
        }] });

// Angular Core
class CheckboxFieldComponent {
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
    ], ngImport: i0, template: "<div class=\"checkbox-template\">\r\n  <p-checkbox\r\n    *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n    [binary]=\"true\"\r\n    [disabled]=\"this.disabled\"\r\n    [formControl]=\"this.formControl\"\r\n    [inputId]=\"this.inputId\"\r\n    [label]=\"this.label\"\r\n    (onChange)=\"this.onCheckChange()\"\r\n  >\r\n  </p-checkbox>\r\n</div>\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div>\r\n    <span *ngIf=\"this.formControl.value\"><i class=\"pi pi-check\"></i></span>\r\n    <span *ngIf=\"!this.formControl.value\"><i class=\"pi pi-times\"></i></span>\r\n  </div>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i3$2.Checkbox, selector: "p-checkbox", inputs: ["value", "name", "disabled", "binary", "label", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "style", "styleClass", "labelStyleClass", "formControl", "checkboxIcon", "readonly", "required", "trueValue", "falseValue"], outputs: ["onChange"] }] });
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

// Modules
class CheckboxFieldModule {
}
CheckboxFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckboxFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckboxFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckboxFieldModule, declarations: [CheckboxFieldComponent], imports: [FieldsModule, CheckboxModule], exports: [CheckboxFieldComponent] });
CheckboxFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckboxFieldModule, imports: [FieldsModule, CheckboxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckboxFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CheckboxFieldComponent],
                    imports: [FieldsModule, CheckboxModule],
                    exports: [CheckboxFieldComponent],
                }]
        }] });

// Angular Core
class DateFieldComponent {
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
    ], ngImport: i0, template: "<p-calendar\r\n  *ngIf=\"!this.isReadOnly; else readOnlyTemplate\"\r\n  [formControl]=\"this.formControl\"\r\n  [inputId]=\"this.inputId\"\r\n  [dateFormat]=\"this.dateFormat\"\r\n  [placeholder]=\"this.placeholder\"\r\n  [showIcon]=\"this.showIcon\"\r\n  [minDate]=\"this.minDate\"\r\n  [maxDate]=\"this.maxDate\"\r\n  [view]=\"this.view\"\r\n  [disabled]=\"this.disabled\"\r\n  (onBlur)=\"onBlur()\"\r\n  class=\"treetableDate\"\r\n>\r\n</p-calendar>\r\n\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n    >\r\n      {{ this.formControl.value | date : 'dd/MM/yyyy' }}\r\n    </span>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n", styles: [""], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i3$3.Calendar, selector: "p-calendar", inputs: ["style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "iconAriaLabel", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "view", "defaultDate", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "locale"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }, { kind: "pipe", type: i1.DatePipe, name: "date" }] });
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

// Modules
class DateFieldModule {
}
DateFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DateFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DateFieldModule, declarations: [DateFieldComponent], imports: [FieldsModule, CalendarModule], exports: [DateFieldComponent] });
DateFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateFieldModule, imports: [FieldsModule, CalendarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DateFieldComponent],
                    imports: [FieldsModule, CalendarModule],
                    exports: [DateFieldComponent],
                }]
        }] });

class SelectFieldComponent {
    constructor() {
        this.isReadOnly = false;
        this.options = [];
        this.multiSelect = false;
        this.disabled = false;
        this.showClear = false;
        this.formControl = new FormControl(null);
        this.hasValue = false;
        this._componentDestroyed$ = new Subject();
        this.onChange = (value) => { };
        this.onTouched = () => { };
    }
    ngOnInit() {
        this.formControl.valueChanges
            .pipe(takeUntil(this._componentDestroyed$))
            .subscribe((value) => {
            this.displayValue = value;
            this.hasValue = Array.isArray(value) ? !!value.length : !!value;
            this.onChange(value);
        });
    }
    ngOnDestroy() {
        this._componentDestroyed$.next();
        this._componentDestroyed$.complete();
    }
    writeValue(value) {
        if (Array.isArray(value)) {
            // MultiSelect
            const fullOptions = value.map(id => this.getFullOptionFromId(id));
            this.formControl.setValue(fullOptions);
        }
        else {
            // Select
            const fullOption = this.getFullOptionFromId(value);
            this.formControl.setValue(fullOption);
        }
    }
    registerOnChange(fn) {
        this.onChange = (value) => {
            if (Array.isArray(value)) {
                const ids = value.map(option => this.getIdFromOption(option));
                fn(ids);
            }
            else {
                const id = this.getIdFromOption(value);
                fn(id);
            }
        };
    }
    // Busco en la lista de opciones la opción cuyo ID coincide con el que proporcionamos.
    // Si no encontramos una opción que coincida, retorno null.
    getFullOptionFromId(id) {
        return this.options.find(option => option.id === id) || null;
    }
    getIdFromOption(option) {
        return option ? option.id : null;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this._disableFormControl() : this._enableFormControl();
    }
    _enableFormControl() {
        this.formControl.enable({ emitEvent: false });
    }
    _disableFormControl() {
        this.formControl.disable({ emitEvent: false });
    }
}
SelectFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SelectFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SelectFieldComponent, selector: "custom-select-field", inputs: { isReadOnly: ["readonly", "isReadOnly"], inputId: "inputId", options: "options", multiSelect: "multiSelect", disabled: "disabled", showClear: "showClear", placeholder: "placeholder" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectFieldComponent,
            multi: true,
        },
    ], ngImport: i0, template: "<ng-container *ngIf=\"!this.isReadOnly; else readOnlyTemplate\">\r\n  <p-multiSelect\r\n    *ngIf=\"this.multiSelect; else singleSelectTemplate\"\r\n    [options]=\"this.options\"\r\n    [formControl]=\"this.formControl\"\r\n    [defaultLabel]=\"this.placeholder || 'Seleccione una o multiples opciones'\"\r\n    dataKey=\"id\"\r\n    optionLabel=\"description\"\r\n    display=\"chip\"\r\n    [readonly]=\"this.isReadOnly\"\r\n    [inputId]=\"this.inputId\"\r\n    [disabled]=\"this.disabled\"\r\n    (onChange)=\"this.onTouched()\"\r\n    (onPanelHide)=\"this.onTouched()\"\r\n  >\r\n  </p-multiSelect>\r\n  <ng-template #singleSelectTemplate>\r\n    <p-dropdown\r\n      [options]=\"this.options\"\r\n      [formControl]=\"this.formControl\"\r\n      [showClear]=\"this.showClear\"\r\n      [placeholder]=\"this.placeholder || 'Seleccione una opci\u00F3n'\"\r\n      dataKey=\"id\"\r\n      optionLabel=\"description\"\r\n      [readonly]=\"this.isReadOnly\"\r\n      [inputId]=\"this.inputId\"\r\n      [disabled]=\"this.disabled\"\r\n      (onChange)=\"this.onTouched()\"\r\n      (onHide)=\"this.onTouched()\"\r\n    >\r\n    </p-dropdown>\r\n  </ng-template>\r\n</ng-container>\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <ng-container *ngIf=\"this.multiSelect; else singleSelectTemplate\">\r\n      <ul\r\n        *ngIf=\"this.displayValue && this.displayValue.length; else emptyValueTemplate\"\r\n        class=\"read-only-template__list\"\r\n      >\r\n        <li\r\n          *ngFor=\"let value of displayValue\"\r\n          class=\"read-only-template__list--item\"\r\n        >\r\n          {{ value.description }}\r\n        </li>\r\n      </ul>\r\n    </ng-container>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #singleSelectTemplate>\r\n  <span\r\n    *ngIf=\"this.displayValue; else emptyValueTemplate\"\r\n    class=\"read-only-template__value\"\r\n    >{{ this.displayValue.description }}</span\r\n  >\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i3$4.MultiSelect, selector: "p-multiSelect", inputs: ["style", "styleClass", "panelStyle", "panelStyleClass", "inputId", "disabled", "readonly", "group", "filter", "filterPlaceHolder", "filterLocale", "overlayVisible", "tabindex", "appendTo", "dataKey", "name", "label", "ariaLabelledBy", "displaySelectedLabel", "maxSelectedLabels", "selectionLimit", "selectedItemsLabel", "showToggleAll", "emptyFilterMessage", "emptyMessage", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "showHeader", "filterBy", "scrollHeight", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "filterMatchMode", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "display", "autocomplete", "showClear", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "defaultLabel", "placeholder", "options", "filterValue", "itemSize"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onClear", "onPanelShow", "onPanelHide", "onLazyLoad", "onRemove"] }, { kind: "component", type: i4.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "overlayDirection", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-select-field', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: SelectFieldComponent,
                            multi: true,
                        },
                    ], template: "<ng-container *ngIf=\"!this.isReadOnly; else readOnlyTemplate\">\r\n  <p-multiSelect\r\n    *ngIf=\"this.multiSelect; else singleSelectTemplate\"\r\n    [options]=\"this.options\"\r\n    [formControl]=\"this.formControl\"\r\n    [defaultLabel]=\"this.placeholder || 'Seleccione una o multiples opciones'\"\r\n    dataKey=\"id\"\r\n    optionLabel=\"description\"\r\n    display=\"chip\"\r\n    [readonly]=\"this.isReadOnly\"\r\n    [inputId]=\"this.inputId\"\r\n    [disabled]=\"this.disabled\"\r\n    (onChange)=\"this.onTouched()\"\r\n    (onPanelHide)=\"this.onTouched()\"\r\n  >\r\n  </p-multiSelect>\r\n  <ng-template #singleSelectTemplate>\r\n    <p-dropdown\r\n      [options]=\"this.options\"\r\n      [formControl]=\"this.formControl\"\r\n      [showClear]=\"this.showClear\"\r\n      [placeholder]=\"this.placeholder || 'Seleccione una opci\u00F3n'\"\r\n      dataKey=\"id\"\r\n      optionLabel=\"description\"\r\n      [readonly]=\"this.isReadOnly\"\r\n      [inputId]=\"this.inputId\"\r\n      [disabled]=\"this.disabled\"\r\n      (onChange)=\"this.onTouched()\"\r\n      (onHide)=\"this.onTouched()\"\r\n    >\r\n    </p-dropdown>\r\n  </ng-template>\r\n</ng-container>\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <ng-container *ngIf=\"this.multiSelect; else singleSelectTemplate\">\r\n      <ul\r\n        *ngIf=\"this.displayValue && this.displayValue.length; else emptyValueTemplate\"\r\n        class=\"read-only-template__list\"\r\n      >\r\n        <li\r\n          *ngFor=\"let value of displayValue\"\r\n          class=\"read-only-template__list--item\"\r\n        >\r\n          {{ value.description }}\r\n        </li>\r\n      </ul>\r\n    </ng-container>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #singleSelectTemplate>\r\n  <span\r\n    *ngIf=\"this.displayValue; else emptyValueTemplate\"\r\n    class=\"read-only-template__value\"\r\n    >{{ this.displayValue.description }}</span\r\n  >\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n" }]
        }], propDecorators: { isReadOnly: [{
                type: Input,
                args: ['readonly']
            }], inputId: [{
                type: Input
            }], options: [{
                type: Input
            }], multiSelect: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showClear: [{
                type: Input
            }], placeholder: [{
                type: Input
            }] } });

// Modules
class SelectFieldModule {
}
SelectFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SelectFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldModule, declarations: [SelectFieldComponent], imports: [FieldsModule, MultiSelectModule, DropdownModule], exports: [SelectFieldComponent] });
SelectFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldModule, imports: [FieldsModule, MultiSelectModule, DropdownModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SelectFieldComponent],
                    imports: [FieldsModule, MultiSelectModule, DropdownModule],
                    exports: [SelectFieldComponent],
                }]
        }] });

class TextAreaFieldComponent {
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
    ], ngImport: i0, template: "<textarea\r\n  *ngIf=\"!isReadOnly; else readOnlyTemplate\"\r\n  [formControl]=\"formControl\"\r\n  pInputTextarea\r\n  [id]=\"this.inputId\"\r\n  [placeholder]=\"this.placeholder\"\r\n  (blur)=\"onBlur()\"\r\n  rows=\"5\"\r\n  cols=\"30\"\r\n>\r\n</textarea>\r\n\r\n<ng-template #readOnlyTemplate>\r\n  <div class=\"read-only-template\">\r\n    <span\r\n      *ngIf=\"this.formControl.value; else emptyValueTemplate\"\r\n      class=\"read-only-template__value\"\r\n    >{{ this.formControl.value }}</span\r\n    >\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #emptyValueTemplate>\r\n  <span class=\"read-only-template__value--empty\">-</span>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$5.InputTextarea, selector: "[pInputTextarea]", inputs: ["autoResize"], outputs: ["onResize"] }] });
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

// Modules
class TextAreaFieldModule {
}
TextAreaFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextAreaFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextAreaFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextAreaFieldModule, declarations: [TextAreaFieldComponent], imports: [FieldsModule, InputTextareaModule], exports: [TextAreaFieldComponent] });
TextAreaFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextAreaFieldModule, imports: [FieldsModule, InputTextareaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextAreaFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TextAreaFieldComponent],
                    imports: [FieldsModule, InputTextareaModule],
                    exports: [TextAreaFieldComponent],
                }]
        }] });

class FileUploadFieldComponent {
    constructor() {
        this.accept = "image/*, audio/*, video/*";
        this.formControl = new FormControl([], {
            nonNullable: true
        });
        this.onChange = (value) => { };
        this.onTouched = () => { };
        this._componentDestroyed$ = new Subject();
    }
    onFileDrop(event) {
        var _a;
        event.preventDefault();
        const file = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files.item(0);
        this.addFile(file);
    }
    onFileInput(event) {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a.item(0);
        this.addFile(file);
    }
    addFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (file) {
                try {
                    const uploadFile = yield this.parseToUploadFile(file);
                    const files = this.formControl.value ? [...this.formControl.value, uploadFile] : [uploadFile];
                    this.formControl.setValue(files);
                }
                catch (error) {
                    console.error('Error converting file to upload format', error);
                }
            }
        });
    }
    parseToUploadFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = function () {
                if (reader.result) {
                    resolve({
                        data: reader.result.toString(),
                        name: file.name,
                        type: file.type.split('/')[1],
                        category: file.type.split('/')[0] // split and get 'image' from 'image/png'
                    });
                }
                else {
                    reject(new Error('Error reading file'));
                }
            };
            reader.onerror = function () {
                reject(new Error('Error reading file'));
            };
            reader.readAsDataURL(file);
        });
    }
    onDragOver(event) {
        event.preventDefault();
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
    removeFile(file) {
        const currentFiles = this.formControl.value;
        const updatedFiles = currentFiles.filter((f) => f !== file);
        this.formControl.setValue(updatedFiles);
    }
    // El problema es que cuando hago new value : File[]
    // pero cuando edito es de tipo : string[] (base 64)
    writeValue(files) {
        this.formControl.setValue(files);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
FileUploadFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FileUploadFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: FileUploadFieldComponent, selector: "custom-file-upload", inputs: { accept: "accept", placeholder: "placeholder" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileUploadFieldComponent,
            multi: true
        }
    ], ngImport: i0, template: "<div >\r\n\r\n  <div class=\"drop-zone\" (drop)=\"onFileDrop($event)\" (dragover)=\"onDragOver($event)\" (click)=\"fileUploadInput.click()\">\r\n    <p>Click or Drag and drop files here</p>\r\n    <p class=\"p-placeholder\">{{this.placeholder}}</p>\r\n  </div>\r\n\r\n  <input type=\"file\" (change)=\"onFileInput($event)\" #fileUploadInput class=\"file-input\"  [accept]=\"this.accept\" />\r\n\r\n\r\n  <div class=\"preview-container\">\r\n    <ng-container *ngFor=\"let file of this.formControl.value\">\r\n    <div class=\"preview\" [ngSwitch]=\"file.category\">\r\n      <ng-container  *ngSwitchCase=\"'image'\">\r\n        <img [src]=\"file.data\" alt=\"Image Preview\" />\r\n      </ng-container>\r\n      <ng-container *ngSwitchCase=\"'application'\">\r\n        <p>Application || {{file.name}} - {{file.type}}</p>\r\n      </ng-container>\r\n      <ng-container *ngSwitchCase=\"'audio'\">\r\n        <p>audio</p>\r\n      </ng-container>\r\n      <ng-container *ngSwitchCase=\"'video'\">\r\n        <p>video</p>\r\n      </ng-container>\r\n      <ng-container *ngSwitchDefault>\r\n        <div>File Preview Not Supported</div>\r\n      </ng-container>\r\n      <label>{{file?.name}}</label>\r\n      <p-button icon=\"pi pi-times\" styleClass=\"p-button-rounded p-button-danger p-button-text p-button-sm\" class=\"button\" (click)=\"removeFile(file)\"></p-button>\r\n\r\n    </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n", styles: [".drop-zone{width:100%;height:150px;border:2px dashed #ccc;text-align:center;padding:20px;cursor:pointer;border-radius:6px}.preview-container{display:flex;flex-direction:column}.preview{display:flex;align-items:center;width:100%;column-gap:20px;margin-bottom:10px;padding:12px 10px;border:1px solid #ccc;border-radius:5px;background-color:#fff;box-shadow:0 0 10px #0000001a}.preview:last-child{margin-bottom:19px}.preview p{margin-bottom:10px;text-align:center;color:#333;font-size:16px}.preview img{width:80px;height:60px}.preview-container .button{margin-left:auto}.file-input{display:none!important}.p-placeholder{color:#b3b3b3}\n"], dependencies: [{ kind: "component", type: i1$1.Button, selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "style", "styleClass", "badgeClass", "ariaLabel"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-file-upload', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: FileUploadFieldComponent,
                            multi: true
                        }
                    ], template: "<div >\r\n\r\n  <div class=\"drop-zone\" (drop)=\"onFileDrop($event)\" (dragover)=\"onDragOver($event)\" (click)=\"fileUploadInput.click()\">\r\n    <p>Click or Drag and drop files here</p>\r\n    <p class=\"p-placeholder\">{{this.placeholder}}</p>\r\n  </div>\r\n\r\n  <input type=\"file\" (change)=\"onFileInput($event)\" #fileUploadInput class=\"file-input\"  [accept]=\"this.accept\" />\r\n\r\n\r\n  <div class=\"preview-container\">\r\n    <ng-container *ngFor=\"let file of this.formControl.value\">\r\n    <div class=\"preview\" [ngSwitch]=\"file.category\">\r\n      <ng-container  *ngSwitchCase=\"'image'\">\r\n        <img [src]=\"file.data\" alt=\"Image Preview\" />\r\n      </ng-container>\r\n      <ng-container *ngSwitchCase=\"'application'\">\r\n        <p>Application || {{file.name}} - {{file.type}}</p>\r\n      </ng-container>\r\n      <ng-container *ngSwitchCase=\"'audio'\">\r\n        <p>audio</p>\r\n      </ng-container>\r\n      <ng-container *ngSwitchCase=\"'video'\">\r\n        <p>video</p>\r\n      </ng-container>\r\n      <ng-container *ngSwitchDefault>\r\n        <div>File Preview Not Supported</div>\r\n      </ng-container>\r\n      <label>{{file?.name}}</label>\r\n      <p-button icon=\"pi pi-times\" styleClass=\"p-button-rounded p-button-danger p-button-text p-button-sm\" class=\"button\" (click)=\"removeFile(file)\"></p-button>\r\n\r\n    </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n", styles: [".drop-zone{width:100%;height:150px;border:2px dashed #ccc;text-align:center;padding:20px;cursor:pointer;border-radius:6px}.preview-container{display:flex;flex-direction:column}.preview{display:flex;align-items:center;width:100%;column-gap:20px;margin-bottom:10px;padding:12px 10px;border:1px solid #ccc;border-radius:5px;background-color:#fff;box-shadow:0 0 10px #0000001a}.preview:last-child{margin-bottom:19px}.preview p{margin-bottom:10px;text-align:center;color:#333;font-size:16px}.preview img{width:80px;height:60px}.preview-container .button{margin-left:auto}.file-input{display:none!important}.p-placeholder{color:#b3b3b3}\n"] }]
        }], propDecorators: { accept: [{
                type: Input
            }], placeholder: [{
                type: Input
            }] } });

// Modules
class FileUploadFieldModule {
}
FileUploadFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FileUploadFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldModule, declarations: [FileUploadFieldComponent], imports: [FileUploadModule,
        NgForOf,
        ReactiveFormsModule,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        AsyncPipe,
        DragDropModule,
        NgSwitchDefault,
        GalleriaModule], exports: [FileUploadFieldComponent] });
FileUploadFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldModule, imports: [FileUploadModule,
        ReactiveFormsModule,
        DragDropModule,
        GalleriaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FileUploadModule,
                        NgForOf,
                        ReactiveFormsModule,
                        NgIf,
                        NgSwitch,
                        NgSwitchCase,
                        AsyncPipe,
                        DragDropModule,
                        NgSwitchDefault,
                        GalleriaModule,
                    ],
                    declarations: [FileUploadFieldComponent],
                    exports: [FileUploadFieldComponent],
                }]
        }] });

class LoadingComponent {
    constructor() {
        this.router = inject(Router);
        this.isFullScreen = true;
        this.text = 'Cargando...';
        this.auto = false;
        // Detects whenever a routing transition is happening
        this.detectRoutingOnGoing = false;
        this.show$ = new BehaviorSubject(true);
    }
    ngOnInit() {
        if (this.detectRoutingOnGoing) {
            this.router.events.subscribe(event => {
                //console.log("Event type:", event.constructor.name);
                if (event instanceof NavigationStart ||
                    event instanceof RouteConfigLoadStart) {
                    this.show$.next(true);
                }
                else if (event instanceof NavigationEnd ||
                    event instanceof NavigationError ||
                    event instanceof NavigationCancel ||
                    event instanceof RouteConfigLoadEnd) {
                    this.show$.next(false);
                }
            });
        }
    }
}
LoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoadingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
LoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LoadingComponent, selector: "loading", inputs: { isFullScreen: ["fullScreen", "isFullScreen"], text: "text", auto: "auto", detectRoutingOnGoing: "detectRoutingOnGoing" }, ngImport: i0, template: "<div class=\"overlay flex-center\" [class.overlay--full-screen]=\"isFullScreen\" *ngIf=\"this.show$ | async\">\r\n    <div class=\"loader flex-center\">\r\n        <p-progressSpinner\r\n                class=\"loader__spinner\"\r\n                [style]=\"{ width: '50px', height: '50px' }\"\r\n                styleClass=\"custom-spinner\"\r\n                strokeWidth=\"4\"\r\n                animationDuration=\"1.65s\"\r\n                [class.loader__spinner--full-screen]=\"isFullScreen\"\r\n        ></p-progressSpinner>\r\n        <span\r\n                class=\"loader__text\"\r\n                [class.loader__text--full-screen]=\"isFullScreen\"\r\n        >{{ text }}</span\r\n        >\r\n    </div>\r\n</div>\r\n", styles: [".overlay{position:absolute;inset:0;z-index:99999999}.overlay--full-screen{position:fixed;background-color:#00000087}.overlay .loader__text{color:#4f5c67;display:block;font-size:16px;margin-top:3px;font-weight:500}.overlay .loader__text--full-screen{color:#fff}.flex-center{display:flex;flex-direction:column;justify-content:center;align-items:center}:host ::ng-deep .loader__spinner--full-screen .p-progress-spinner-circle{stroke:#fff!important}:host ::ng-deep .p-progress-spinner-circle{stroke:#384495!important}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.ProgressSpinner, selector: "p-progressSpinner", inputs: ["style", "styleClass", "strokeWidth", "fill", "animationDuration"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'loading', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"overlay flex-center\" [class.overlay--full-screen]=\"isFullScreen\" *ngIf=\"this.show$ | async\">\r\n    <div class=\"loader flex-center\">\r\n        <p-progressSpinner\r\n                class=\"loader__spinner\"\r\n                [style]=\"{ width: '50px', height: '50px' }\"\r\n                styleClass=\"custom-spinner\"\r\n                strokeWidth=\"4\"\r\n                animationDuration=\"1.65s\"\r\n                [class.loader__spinner--full-screen]=\"isFullScreen\"\r\n        ></p-progressSpinner>\r\n        <span\r\n                class=\"loader__text\"\r\n                [class.loader__text--full-screen]=\"isFullScreen\"\r\n        >{{ text }}</span\r\n        >\r\n    </div>\r\n</div>\r\n", styles: [".overlay{position:absolute;inset:0;z-index:99999999}.overlay--full-screen{position:fixed;background-color:#00000087}.overlay .loader__text{color:#4f5c67;display:block;font-size:16px;margin-top:3px;font-weight:500}.overlay .loader__text--full-screen{color:#fff}.flex-center{display:flex;flex-direction:column;justify-content:center;align-items:center}:host ::ng-deep .loader__spinner--full-screen .p-progress-spinner-circle{stroke:#fff!important}:host ::ng-deep .p-progress-spinner-circle{stroke:#384495!important}\n"] }]
        }], propDecorators: { isFullScreen: [{
                type: Input,
                args: ['fullScreen']
            }], text: [{
                type: Input
            }], auto: [{
                type: Input
            }], detectRoutingOnGoing: [{
                type: Input
            }] } });

class LoadingModule {
}
LoadingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoadingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LoadingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: LoadingModule, declarations: [LoadingComponent], imports: [CommonModule,
        ProgressSpinnerModule], exports: [LoadingComponent] });
LoadingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoadingModule, imports: [CommonModule,
        ProgressSpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoadingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        LoadingComponent
                    ],
                    imports: [
                        CommonModule,
                        ProgressSpinnerModule,
                    ],
                    exports: [
                        LoadingComponent
                    ]
                }]
        }] });

function createDateRangeValidator() {
    return (form) => {
        var _a, _b;
        const start = (_a = form.get("promoStartAt")) === null || _a === void 0 ? void 0 : _a.value;
        const end = (_b = form.get("promoEndAt")) === null || _b === void 0 ? void 0 : _b.value;
        if (start && end && end.getTime() - start.getTime() >= 0) {
            return null;
        }
        return start && end ? { dateRangeInvalid: true } : null;
    };
}

function createPasswordStrengthValidator() {
    return (control) => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const hasUpperCase = /[A-Z]+/.test(value);
        if (!hasUpperCase) {
            return { hasUppercase: true };
        }
        const hasLowerCase = /[a-z]+/.test(value);
        if (!hasLowerCase) {
            return { hasLowerCase: true };
        }
        const hasNumeric = /[0-9]+/.test(value);
        if (!hasNumeric)
            return { hasNumeric: true };
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
        return !passwordValid ? { passwordStrength: true } : null;
    };
}

const FieldType = {
    TEXT: 'text',
    NUMBER: 'number',
    DATE: 'date',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    CHECK: 'check',
    TEXTAREA: 'textarea',
    FILE_UPLOAD: 'file_upload',
    FORM_GROUP: 'form',
    INVISIBLE: null
};
const defaultFieldValues = {
    TEXT: '',
    TEXTAREA: '',
    CHECK: false,
    NUMBER: null,
    DATE: null,
    SELECT: null,
    MULTI_SELECT: null,
    FILE_UPLOAD: null,
    FORM_GROUP: null,
    INVISIBLE: null
};
const DEFAULT_ERROR_TYPES = [
    { type: 'required', message: 'is required.', showOnSubmit: false },
    { type: 'minlength', message: 'minimum length error.', showOnSubmit: false },
    { type: 'maxlength', message: 'maximum length exceeded.', showOnSubmit: false },
    { type: 'hasLowerCase', message: 'requires at least one lower case letter.', showOnSubmit: false },
    { type: 'hasUppercase', message: 'requires at least one upper case letter.', showOnSubmit: false },
    { type: 'hasNumeric', message: 'requires at least one numeric character.', showOnSubmit: false },
    { type: 'passwordsNotMatch', message: 'Passwords should match', showOnSubmit: false },
    { type: 'alphanumericPattern', message: 'should contain only alphanumeric characters', showOnSubmit: false },
    { type: 'whitespacePattern', message: 'does not accept spaces', showOnSubmit: false },
    { type: 'emailPattern', message: 'invalid', showOnSubmit: false },
    { type: 'whitespacePattern', message: 'should not contain spaces', showOnSubmit: false },
    { type: 'usernameExists', message: 'Username already exists.', showOnSubmit: false },
    { type: 'emailExists', message: 'already exists.', showOnSubmit: false },
    { type: 'invalidCredentials', message: 'Invalid credentials.', showOnSubmit: true },
];

class FormService {
    constructor() {
        this.resetForm$ = new Subject();
    }
}
FormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

var FormStatus;
(function (FormStatus) {
    FormStatus["INVALID"] = "INVALID";
    FormStatus["VALID"] = "VALID";
    FormStatus["PENDING"] = "PENDING";
})(FormStatus || (FormStatus = {}));
// DynamicFormComponent is an Angular component that creates a form based on a given structure and manages its state.
class DynamicFormComponent {
    constructor(fb, changeDetector, formService) {
        this.fb = fb;
        this.changeDetector = changeDetector;
        this.formService = formService;
        this.formReadOnly = false;
        this.updateForm = new EventEmitter();
        this.fieldType = FieldType;
        this.defaultErrors = DEFAULT_ERROR_TYPES;
        this.formSubmitted$ = new BehaviorSubject(false);
        this.formDestroyed$ = new Subject();
        this.formInitialized = new EventEmitter();
        // Initializes the form group property and sets up listeners for form changes.
        // Context is shared by JS, thats why I have access to FormGroup instance.
        this.initializeForm = (form) => {
            this.form = form;
            this.listenFormChanges(form);
            this.listenFormStatusChanges(form);
            this.formInitialized.emit(this.form);
        };
        // Builds a FormGroup based on the provided structure and adds FormControl instances for each field.
        this.formBuilder = (structure) => {
            const formGroupConfig = structure.find(field => field.name === null);
            const groupValidators = (formGroupConfig === null || formGroupConfig === void 0 ? void 0 : formGroupConfig.validators) || [];
            const groupAsyncValidators = (formGroupConfig === null || formGroupConfig === void 0 ? void 0 : formGroupConfig.asyncValidators) || [];
            const groupUpdateOn = formGroupConfig === null || formGroupConfig === void 0 ? void 0 : formGroupConfig.updateOn;
            // Remove the FormGroup config from the structure array.
            if (formGroupConfig)
                structure = structure.filter(field => field.name !== null);
            const group = this.fb.group({}, {
                validators: groupValidators,
                asyncValidators: groupAsyncValidators,
                updateOn: groupUpdateOn
            });
            structure.forEach((field) => group.addControl(field.name, this.control(field)));
            return group;
        };
        // Creates a FormControl for the given field with its initial value, validators, and other configurations.
        this.control = (field) => {
            const value = field.type ? defaultFieldValues[field.type.toUpperCase()] : null;
            return this.fb.control({ value, disabled: field.disabled || false }, {
                validators: field.validators,
                asyncValidators: field.asyncValidators,
                updateOn: field.updateOn
            });
        };
        // Patches the form with the given data or an empty object if data is not provided.
        this.patchValue = ([form, data]) => {
            // Only patch values if the data object is different from the current form values
            if (!this.isEqual(data, form.value)) {
                form.patchValue(data || {}, { emitEvent: false });
            }
        };
    }
    ngOnInit() {
        this.watchForFormBuild();
        this.formService.resetForm$.pipe(takeUntil(this.formDestroyed$)).subscribe(() => {
            var _a;
            (_a = this.form) === null || _a === void 0 ? void 0 : _a.reset();
        });
    }
    submitted() {
        this.form.markAsTouched();
        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();
        this.formSubmitted$.next(true);
        this.changeDetector.detectChanges();
    }
    hasValidator(control) {
        return this.form.controls[control].hasValidator(Validators.required) || this.form.controls[control].hasValidator(Validators.requiredTrue);
    }
    // Subscribes to structure$ and then to data$ observables to build and patch the form.
    // They are also responsible for handling form patching and resetting based on structure and data.
    watchForFormBuild() {
        this.structure$
            .pipe(map(this.formBuilder), tap(this.initializeForm), (f$) => combineLatest([f$, this.data$]), takeUntil(this.formDestroyed$))
            .subscribe(this.patchValue);
    }
    // Listens for form value changes and emits the updateForm event with the changes.
    listenFormChanges(form) {
        form.valueChanges
            .pipe(debounceTime(100), distinctUntilChanged((prev, curr) => this.isEqual(prev, curr)), takeUntil(this.formDestroyed$))
            .subscribe((changes) => {
            this.updateForm.emit({
                data: changes,
                valid: this.form.valid,
                status: this.form.status
            });
        });
    }
    listenFormStatusChanges(form) {
        let prevStatus = 'INVALID';
        form.statusChanges.pipe(takeUntil(this.formDestroyed$))
            .subscribe((status => {
            if (prevStatus === 'PENDING') {
                this.updateForm.emit({
                    data: this.form.value,
                    valid: this.form.valid,
                    status
                });
            }
            prevStatus = status;
        }));
    }
    // Deep equality check for two objects.
    // FIXME: Should I add extenal library to improve performance ?
    isEqual(obj1, obj2) {
        if (obj1 === obj2)
            return true;
        if (typeof obj1 !== 'object' ||
            typeof obj2 !== 'object' ||
            obj1 === null ||
            obj2 === null)
            return false;
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length)
            return false;
        for (const key of keys1) {
            if (!keys2.includes(key))
                return false;
            if (!this.isEqual(obj1[key], obj2[key]))
                return false;
        }
        return true;
    }
    ngOnDestroy() {
        this.formDestroyed$.next();
        this.formDestroyed$.complete();
    }
    // ------------------------------ Implementation of  ControlValueAccessor methods ------------------------------
    writeValue(value) {
        this.form.patchValue(value, { emitEvent: false });
    }
    registerOnChange(fn) {
        this.form.valueChanges.pipe(filter(() => this.form.touched), distinctUntilChanged()).subscribe(fn);
    }
    registerOnTouched(fn) {
        this.form.valueChanges.pipe(filter(() => this.form.touched), distinctUntilChanged()).subscribe(fn);
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.form.disable() : this.form.enable();
    }
}
DynamicFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormComponent, deps: [{ token: i2.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: FormService }], target: i0.ɵɵFactoryTarget.Component });
DynamicFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DynamicFormComponent, selector: "dynamic-form", inputs: { structure$: "structure$", data$: "data$", formReadOnly: ["readonly", "formReadOnly"] }, outputs: { updateForm: "updateForm", formInitialized: "formInitialized" }, ngImport: i0, template: "<form [formGroup]=\"form\" class=\"form\" autocomplete=\"off\">\r\n  <div\r\n    *ngFor=\"let field of structure$ | async\"\r\n    class=\"field\"\r\n    [ngClass]=\"field.name\"\r\n    [class.read-only-form]=\"formReadOnly\"\r\n  >\r\n\r\n    <ng-container *ngIf=\"(!!field.hide ? !field.hide(this.form) : true) && field.name\">\r\n\r\n      <label\r\n         class=\"field__label\"\r\n         [for]=\"field.name\"\r\n         [class.required]=\"hasValidator(field.name)\"\r\n      >{{ field.label }}</label>\r\n\r\n      <ng-container [ngSwitch]=\"field.type\">\r\n        <!-- ------------ Number Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.NUMBER\">\r\n            <custom-number-field\r\n              [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\"\r\n              [max]=\"field.number?.max!\"\r\n              [maxFractionDigits]=\"field.number?.maxFractionDigits!\"\r\n              [readonly]=\"field.readonly || formReadOnly\"\r\n              class=\"form-group__input\"\r\n              [formControlName]=\"field.name\"\r\n              [placeholder]=\"field.placeholder!\"\r\n              [inputId]=\"field.name\"\r\n            ></custom-number-field>\r\n        </ng-container>\r\n        <!-- ------------ Number Field Ends ------------ -->\r\n\r\n        <!-- ------------ Checkbox Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.CHECK\">\r\n          <custom-checkbox-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [formControlName]=\"field.name\"\r\n            [inputId]=\"field.name\"\r\n          ></custom-checkbox-field>\r\n        </ng-container>\r\n\r\n        <!-- ------------ Date Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.DATE\">\r\n          <custom-date-field [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\"\r\n                  [readonly]=\"field.readonly || formReadOnly\"\r\n                  class=\"form-group__input\"\r\n                  [formControlName]=\"field.name\"\r\n                  [inputId]=\"field.name\"\r\n                  [placeholder]=\"field.placeholder!\"\r\n          ></custom-date-field>\r\n        </ng-container>\r\n        <!-- ------------ Date Ends ------------ -->\r\n\r\n        <!-- ------------ TextArea Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.TEXTAREA\">\r\n          <custom-text-area-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched \"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [formControlName]=\"field.name\"\r\n            [inputId]=\"field.name\"\r\n            [placeholder]=\"field.placeholder!\"\r\n          ></custom-text-area-field>\r\n        </ng-container>\r\n        <!-- ------------ TextArea Ends ------------ -->\r\n\r\n        <!-- ------------ Select Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.SELECT\">\r\n          <custom-select-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\r\n            \"\r\n            [options]=\"field.select?.options ?? []\"\r\n            [showClear]=\"field.select?.showClear ?? false\"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [formControlName]=\"field.name\"\r\n            [inputId]=\"field.name\"\r\n            [placeholder]=\"field.placeholder!\"\r\n          ></custom-select-field>\r\n        </ng-container>\r\n        <!-- ------------ Select Field Ends ------------ -->\r\n\r\n        <!-- ------------ Multi Select Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.MULTI_SELECT\">\r\n          <custom-select-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [options]=\"field.select?.options ?? []\"\r\n            [formControlName]=\"field.name\"\r\n            [inputId]=\"field.name\"\r\n            [multiSelect]=\"true\"\r\n            [placeholder]=\"field.placeholder!\"\r\n          ></custom-select-field>\r\n        </ng-container>\r\n        <!-- ------------ Multi Select Field Ends ------------ -->\r\n\r\n        <!-- ------------ File Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.FILE_UPLOAD\">\r\n          <custom-file-upload\r\n                  [class.error]=\"\r\n                      this.form.controls[field.name].invalid &&\r\n                      this.form.controls[field.name].touched\"\r\n                  class=\"form-group__input\"\r\n                  [formControlName]=\"field.name\"\r\n                  [accept]=\"field.file?.accept!\"\r\n                  [placeholder]=\"field.placeholder!\"\r\n          ></custom-file-upload>\r\n        </ng-container>\r\n        <!-- ------------ File Field Ends ------------ -->\r\n\r\n        <!-- -------------- Edge Case Starts -------------- -->\r\n        <!-- This is for passing id as form value if needed -->\r\n        <ng-container *ngSwitchCase=\"fieldType.INVISIBLE\"></ng-container>\r\n        <!-- --------------- Edge Case Ends --------------- -->\r\n\r\n        <!-- -------------- Default Case Starts (Classic input) -------------- -->\r\n        <ng-container *ngSwitchDefault>\r\n          <custom-text-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\r\n            \"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [formControlName]=\"field.name\"\r\n            [placeholder]=\"field.placeholder || ''\"\r\n            [icon]=\"field.attrs?.icon \"\r\n            [iconPosition]=\"field.attrs?.iconPosition \"\r\n            [type]=\"field.attrs?.type\"\r\n            [inputId]=\"field.name\"\r\n            [loading$]=\"this.form.controls[field.name].statusChanges\"\r\n          ></custom-text-field>\r\n<!--          <pre>{{this.form.controls[field.name].errors | json}}</pre>-->\r\n        </ng-container>\r\n        <!-- -------------- Default Case Ends (Classic input) -------------- -->\r\n\r\n\r\n\r\n        <!-- -------------- FormControl (Field) Error Starts -------------- -->\r\n        <ng-container *ngFor=\"let error of (field.errors ?? []).concat(this.defaultErrors)\">\r\n          <ng-container *ngIf=\"this.form.controls[field.name].hasError(error.type) &&  !field.readonly && !formReadOnly\">\r\n          <!-- Common error -->\r\n          <small class=\"error-message\" *ngIf=\"!error?.showOnSubmit\">{{ field.label }} {{ error.message }}</small>\r\n\r\n          <!-- Error showed on submit-->\r\n          <small class=\"error-message\" *ngIf=\"error?.showOnSubmit && (this.formSubmitted$ | async)\">{{ field.label }} {{ error.message }}</small>\r\n\r\n            <!-- Error for maxlength -->\r\n<!--            <small class=\"error-message\"-->\r\n<!--                   *ngIf=\"!error?.showOnSubmit && error.type === 'maxlength' && form.controls[field.name]?.errors?.['maxlength']\"-->\r\n<!--            >-->\r\n<!--              The maximum value allowed is {{ form.controls[field.name].errors?.['maxlength']?.['requiredLength'] }}. However, the actual value provided is {{ form.controls[field.name].errors?.['maxlength']?.['actualLength'] }}. Please provide a value less than or equal to the maximum allowed value.-->\r\n<!--            </small>-->\r\n          </ng-container>\r\n        </ng-container>\r\n        <!-- -------------- FormControl (Field) Error Ends -------------- -->\r\n\r\n\r\n        <!-- FormControl (Field) \".groupErrors[]\" Starts -->\r\n        <ng-container *ngIf=\"field.groupErrors\">\r\n          <ng-container *ngFor=\"let groupError of field.groupErrors\">\r\n            <small\r\n              class=\"group-error-message\"\r\n              *ngIf=\"\r\n            form.invalid &&\r\n            form.hasError(groupError.type) &&\r\n            form.controls[field.name].touched &&\r\n            !form.controls[field.name].errors &&\r\n            !groupError?.showOnSubmit &&\r\n            (formSubmitted$ | async)\r\n          \"\r\n            >\r\n              {{ groupError.message }}\r\n            </small>\r\n          </ng-container>\r\n        </ng-container>\r\n        <!-- FormControl (Field) \".groupErrors[]\" Ends -->\r\n\r\n      </ng-container>\r\n    </ng-container>\r\n  </div>\r\n\r\n\r\n<!--    FIXME : I should write css to hide this error if there is a field related error being showed-->\r\n  <!-- Errors associated to FormGroup Starts -->\r\n<!--  <div class=\"form-group-errors\" *ngIf=\"form.invalid && form.errors\">-->\r\n<!--    <ng-container *ngFor=\"let field of structure$ | async\">-->\r\n<!--      <ng-container *ngIf=\"!field.name && field.errors\">-->\r\n<!--        <ng-container *ngFor=\"let error of field.errors\">-->\r\n<!--          <small class=\"error-message\" *ngIf=\"form.hasError(error.type)\">-->\r\n<!--              {{ error.message }}-->\r\n<!--          </small>-->\r\n<!--        </ng-container>-->\r\n<!--      </ng-container>-->\r\n<!--    </ng-container>-->\r\n<!--  </div>-->\r\n  <!-- Errors associated to FormGroup ends -->\r\n\r\n</form>\r\n", styles: [".read-only-form{margin-top:12px;margin-bottom:12px}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: NumberFieldComponent, selector: "custom-number-field", inputs: ["placeholder", "minFractionDigits", "maxFractionDigits", "min", "max", "maxLength", "locale", "prefix", "suffix", "disabled", "useGrouping", "inputId", "readonly"] }, { kind: "component", type: CheckboxFieldComponent, selector: "custom-checkbox-field", inputs: ["readonly", "inputId", "label", "disabled"] }, { kind: "component", type: SelectFieldComponent, selector: "custom-select-field", inputs: ["readonly", "inputId", "options", "multiSelect", "disabled", "showClear", "placeholder"] }, { kind: "component", type: DateFieldComponent, selector: "custom-date-field", inputs: ["readonly", "inputId", "disabled", "showIcon", "min", "max", "format", "view", "placeholder"] }, { kind: "component", type: TextFieldComponent, selector: "custom-text-field", inputs: ["placeholder", "inputId", "readonly", "disabled", "iconPosition", "type", "icon", "loading$"] }, { kind: "component", type: TextAreaFieldComponent, selector: "custom-text-area-field", inputs: ["readonly", "placeholder", "inputId"] }, { kind: "component", type: FileUploadFieldComponent, selector: "custom-file-upload", inputs: ["accept", "placeholder"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dynamic-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form [formGroup]=\"form\" class=\"form\" autocomplete=\"off\">\r\n  <div\r\n    *ngFor=\"let field of structure$ | async\"\r\n    class=\"field\"\r\n    [ngClass]=\"field.name\"\r\n    [class.read-only-form]=\"formReadOnly\"\r\n  >\r\n\r\n    <ng-container *ngIf=\"(!!field.hide ? !field.hide(this.form) : true) && field.name\">\r\n\r\n      <label\r\n         class=\"field__label\"\r\n         [for]=\"field.name\"\r\n         [class.required]=\"hasValidator(field.name)\"\r\n      >{{ field.label }}</label>\r\n\r\n      <ng-container [ngSwitch]=\"field.type\">\r\n        <!-- ------------ Number Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.NUMBER\">\r\n            <custom-number-field\r\n              [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\"\r\n              [max]=\"field.number?.max!\"\r\n              [maxFractionDigits]=\"field.number?.maxFractionDigits!\"\r\n              [readonly]=\"field.readonly || formReadOnly\"\r\n              class=\"form-group__input\"\r\n              [formControlName]=\"field.name\"\r\n              [placeholder]=\"field.placeholder!\"\r\n              [inputId]=\"field.name\"\r\n            ></custom-number-field>\r\n        </ng-container>\r\n        <!-- ------------ Number Field Ends ------------ -->\r\n\r\n        <!-- ------------ Checkbox Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.CHECK\">\r\n          <custom-checkbox-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [formControlName]=\"field.name\"\r\n            [inputId]=\"field.name\"\r\n          ></custom-checkbox-field>\r\n        </ng-container>\r\n\r\n        <!-- ------------ Date Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.DATE\">\r\n          <custom-date-field [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\"\r\n                  [readonly]=\"field.readonly || formReadOnly\"\r\n                  class=\"form-group__input\"\r\n                  [formControlName]=\"field.name\"\r\n                  [inputId]=\"field.name\"\r\n                  [placeholder]=\"field.placeholder!\"\r\n          ></custom-date-field>\r\n        </ng-container>\r\n        <!-- ------------ Date Ends ------------ -->\r\n\r\n        <!-- ------------ TextArea Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.TEXTAREA\">\r\n          <custom-text-area-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched \"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [formControlName]=\"field.name\"\r\n            [inputId]=\"field.name\"\r\n            [placeholder]=\"field.placeholder!\"\r\n          ></custom-text-area-field>\r\n        </ng-container>\r\n        <!-- ------------ TextArea Ends ------------ -->\r\n\r\n        <!-- ------------ Select Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.SELECT\">\r\n          <custom-select-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\r\n            \"\r\n            [options]=\"field.select?.options ?? []\"\r\n            [showClear]=\"field.select?.showClear ?? false\"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [formControlName]=\"field.name\"\r\n            [inputId]=\"field.name\"\r\n            [placeholder]=\"field.placeholder!\"\r\n          ></custom-select-field>\r\n        </ng-container>\r\n        <!-- ------------ Select Field Ends ------------ -->\r\n\r\n        <!-- ------------ Multi Select Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.MULTI_SELECT\">\r\n          <custom-select-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [options]=\"field.select?.options ?? []\"\r\n            [formControlName]=\"field.name\"\r\n            [inputId]=\"field.name\"\r\n            [multiSelect]=\"true\"\r\n            [placeholder]=\"field.placeholder!\"\r\n          ></custom-select-field>\r\n        </ng-container>\r\n        <!-- ------------ Multi Select Field Ends ------------ -->\r\n\r\n        <!-- ------------ File Field Starts ------------ -->\r\n        <ng-container *ngSwitchCase=\"fieldType.FILE_UPLOAD\">\r\n          <custom-file-upload\r\n                  [class.error]=\"\r\n                      this.form.controls[field.name].invalid &&\r\n                      this.form.controls[field.name].touched\"\r\n                  class=\"form-group__input\"\r\n                  [formControlName]=\"field.name\"\r\n                  [accept]=\"field.file?.accept!\"\r\n                  [placeholder]=\"field.placeholder!\"\r\n          ></custom-file-upload>\r\n        </ng-container>\r\n        <!-- ------------ File Field Ends ------------ -->\r\n\r\n        <!-- -------------- Edge Case Starts -------------- -->\r\n        <!-- This is for passing id as form value if needed -->\r\n        <ng-container *ngSwitchCase=\"fieldType.INVISIBLE\"></ng-container>\r\n        <!-- --------------- Edge Case Ends --------------- -->\r\n\r\n        <!-- -------------- Default Case Starts (Classic input) -------------- -->\r\n        <ng-container *ngSwitchDefault>\r\n          <custom-text-field\r\n            [class.error]=\"\r\n              this.form.controls[field.name].invalid &&\r\n              this.form.controls[field.name].touched\r\n            \"\r\n            [readonly]=\"field.readonly || formReadOnly\"\r\n            class=\"form-group__input\"\r\n            [formControlName]=\"field.name\"\r\n            [placeholder]=\"field.placeholder || ''\"\r\n            [icon]=\"field.attrs?.icon \"\r\n            [iconPosition]=\"field.attrs?.iconPosition \"\r\n            [type]=\"field.attrs?.type\"\r\n            [inputId]=\"field.name\"\r\n            [loading$]=\"this.form.controls[field.name].statusChanges\"\r\n          ></custom-text-field>\r\n<!--          <pre>{{this.form.controls[field.name].errors | json}}</pre>-->\r\n        </ng-container>\r\n        <!-- -------------- Default Case Ends (Classic input) -------------- -->\r\n\r\n\r\n\r\n        <!-- -------------- FormControl (Field) Error Starts -------------- -->\r\n        <ng-container *ngFor=\"let error of (field.errors ?? []).concat(this.defaultErrors)\">\r\n          <ng-container *ngIf=\"this.form.controls[field.name].hasError(error.type) &&  !field.readonly && !formReadOnly\">\r\n          <!-- Common error -->\r\n          <small class=\"error-message\" *ngIf=\"!error?.showOnSubmit\">{{ field.label }} {{ error.message }}</small>\r\n\r\n          <!-- Error showed on submit-->\r\n          <small class=\"error-message\" *ngIf=\"error?.showOnSubmit && (this.formSubmitted$ | async)\">{{ field.label }} {{ error.message }}</small>\r\n\r\n            <!-- Error for maxlength -->\r\n<!--            <small class=\"error-message\"-->\r\n<!--                   *ngIf=\"!error?.showOnSubmit && error.type === 'maxlength' && form.controls[field.name]?.errors?.['maxlength']\"-->\r\n<!--            >-->\r\n<!--              The maximum value allowed is {{ form.controls[field.name].errors?.['maxlength']?.['requiredLength'] }}. However, the actual value provided is {{ form.controls[field.name].errors?.['maxlength']?.['actualLength'] }}. Please provide a value less than or equal to the maximum allowed value.-->\r\n<!--            </small>-->\r\n          </ng-container>\r\n        </ng-container>\r\n        <!-- -------------- FormControl (Field) Error Ends -------------- -->\r\n\r\n\r\n        <!-- FormControl (Field) \".groupErrors[]\" Starts -->\r\n        <ng-container *ngIf=\"field.groupErrors\">\r\n          <ng-container *ngFor=\"let groupError of field.groupErrors\">\r\n            <small\r\n              class=\"group-error-message\"\r\n              *ngIf=\"\r\n            form.invalid &&\r\n            form.hasError(groupError.type) &&\r\n            form.controls[field.name].touched &&\r\n            !form.controls[field.name].errors &&\r\n            !groupError?.showOnSubmit &&\r\n            (formSubmitted$ | async)\r\n          \"\r\n            >\r\n              {{ groupError.message }}\r\n            </small>\r\n          </ng-container>\r\n        </ng-container>\r\n        <!-- FormControl (Field) \".groupErrors[]\" Ends -->\r\n\r\n      </ng-container>\r\n    </ng-container>\r\n  </div>\r\n\r\n\r\n<!--    FIXME : I should write css to hide this error if there is a field related error being showed-->\r\n  <!-- Errors associated to FormGroup Starts -->\r\n<!--  <div class=\"form-group-errors\" *ngIf=\"form.invalid && form.errors\">-->\r\n<!--    <ng-container *ngFor=\"let field of structure$ | async\">-->\r\n<!--      <ng-container *ngIf=\"!field.name && field.errors\">-->\r\n<!--        <ng-container *ngFor=\"let error of field.errors\">-->\r\n<!--          <small class=\"error-message\" *ngIf=\"form.hasError(error.type)\">-->\r\n<!--              {{ error.message }}-->\r\n<!--          </small>-->\r\n<!--        </ng-container>-->\r\n<!--      </ng-container>-->\r\n<!--    </ng-container>-->\r\n<!--  </div>-->\r\n  <!-- Errors associated to FormGroup ends -->\r\n\r\n</form>\r\n", styles: [".read-only-form{margin-top:12px;margin-bottom:12px}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: FormService }]; }, propDecorators: { structure$: [{
                type: Input
            }], data$: [{
                type: Input
            }], formReadOnly: [{
                type: Input,
                args: ['readonly']
            }], updateForm: [{
                type: Output
            }], formInitialized: [{
                type: Output
            }] } });

// Modules
// Component
class DynamicFormModule {
}
DynamicFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DynamicFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormModule, declarations: [DynamicFormComponent], imports: [FieldsModule,
        InputNumberModule,
        NumberFieldModule,
        CheckboxFieldModule,
        SelectFieldModule,
        DateFieldModule,
        TextFieldModule,
        ButtonModule,
        TextAreaFieldModule,
        FileUploadFieldModule], exports: [DynamicFormComponent] });
DynamicFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormModule, imports: [FieldsModule,
        InputNumberModule,
        NumberFieldModule,
        CheckboxFieldModule,
        SelectFieldModule,
        DateFieldModule,
        TextFieldModule,
        ButtonModule,
        TextAreaFieldModule,
        FileUploadFieldModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FieldsModule,
                        InputNumberModule,
                        NumberFieldModule,
                        CheckboxFieldModule,
                        SelectFieldModule,
                        DateFieldModule,
                        TextFieldModule,
                        ButtonModule,
                        TextAreaFieldModule,
                        FileUploadFieldModule,
                    ],
                    declarations: [DynamicFormComponent],
                    exports: [DynamicFormComponent],
                }]
        }] });

const formsActions = createActionGroup({
    source: 'ngrxForms',
    events: {
        'Set Data': props(),
        'Set Structure': props(),
        'Update Data': props(),
        'Reset Form': emptyProps(),
        'Destroy Form': emptyProps(),
    },
});

const ngrxFormsInitialState = {
    data: {},
    valid: true,
    status: 'VALID',
    touched: false,
    structure: [],
};
const ngrxFormsFeature = createFeature({
    name: 'ngrxForms',
    reducer: createReducer(ngrxFormsInitialState, on(formsActions.setData, (state, action) => (Object.assign(Object.assign({}, state), { data: action.data }))), on(formsActions.updateData, (state, action) => {
        const data = Object.assign(Object.assign({}, state.data), action.state.data);
        return Object.assign(Object.assign({}, state), { data, valid: action.state.valid, status: action.state.status, touched: true });
    }), on(formsActions.setStructure, (state, action) => (Object.assign(Object.assign({}, state), { structure: action.structure }))), on(formsActions.destroyForm, () => ngrxFormsInitialState), on(formsActions.resetForm, (state) => (Object.assign(Object.assign({}, state), { data: {}, status: 'INVALID', valid: true, touched: false })))),
});

const { selectNgrxFormsState, selectData, selectStructure, selectTouched, selectValid } = ngrxFormsFeature;
const ngrxFormsQuery = {
    selectNgrxFormsState,
    selectData,
    selectStructure,
    selectTouched,
    selectValid,
};

class FormsEffects {
    constructor(actions$, formService) {
        this.actions$ = actions$;
        this.formService = formService;
        this.onFormReset$ = createEffect(() => this.actions$.pipe(ofType(formsActions.resetForm), tap(() => this.formService.resetForm$.next())), { dispatch: false });
    }
}
FormsEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormsEffects, deps: [{ token: i1$2.Actions }, { token: FormService }], target: i0.ɵɵFactoryTarget.Injectable });
FormsEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormsEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormsEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.Actions }, { type: FormService }]; } });

/*
 * Public API Surface of ui-components
 */
// Modules
// export * from './lib/ui-components.module';

/**
 * Generated bundle index. Do not edit.
 */

export { CheckboxFieldComponent, CheckboxFieldModule, DEFAULT_ERROR_TYPES, DateFieldComponent, DateFieldModule, DynamicFormComponent, DynamicFormModule, FieldType, FileUploadFieldComponent, FileUploadFieldModule, FormStatus, FormsEffects, LoadingComponent, LoadingModule, NumberFieldComponent, NumberFieldModule, SelectFieldComponent, SelectFieldModule, TextAreaFieldComponent, TextAreaFieldModule, TextFieldComponent, TextFieldModule, createDateRangeValidator, createPasswordStrengthValidator, defaultFieldValues, formsActions, ngrxFormsFeature, ngrxFormsInitialState, ngrxFormsQuery };
//# sourceMappingURL=ui-components.mjs.map
