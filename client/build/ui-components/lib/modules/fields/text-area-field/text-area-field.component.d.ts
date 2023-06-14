import { OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class TextAreaFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
    isReadOnly: boolean;
    placeholder: string;
    inputId: string;
    isDisabled: boolean;
    formControl: FormControl;
    onChange: (value: string) => void;
    onTouched: () => void;
    private _componentDestroyed$;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    onBlur(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextAreaFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextAreaFieldComponent, "custom-text-area-field", never, { "isReadOnly": "readonly"; "placeholder": "placeholder"; "inputId": "inputId"; }, {}, never, never, false, never>;
}
