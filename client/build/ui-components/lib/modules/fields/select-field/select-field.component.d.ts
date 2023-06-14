import { OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export interface IOption {
    id: any;
    description: string;
}
export declare class SelectFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
    isReadOnly: boolean;
    inputId: string;
    options: IOption[];
    multiSelect: boolean;
    disabled: boolean;
    showClear: boolean;
    placeholder: string;
    formControl: FormControl<IOption | IOption[] | null>;
    displayValue: any;
    hasValue: boolean;
    private _componentDestroyed$;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onChange: (value: any | any[] | null) => void;
    onTouched: () => void;
    writeValue(value: any | any[]): void;
    registerOnChange(fn: any): void;
    private getFullOptionFromId;
    private getIdFromOption;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    private _enableFormControl;
    private _disableFormControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectFieldComponent, "custom-select-field", never, { "isReadOnly": "readonly"; "inputId": "inputId"; "options": "options"; "multiSelect": "multiSelect"; "disabled": "disabled"; "showClear": "showClear"; "placeholder": "placeholder"; }, {}, never, never, false, never>;
}
