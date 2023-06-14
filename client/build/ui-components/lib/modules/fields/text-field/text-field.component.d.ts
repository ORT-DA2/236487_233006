import { OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class TextFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
    placeholder: string | undefined;
    inputId: string;
    isReadOnly: boolean;
    disabled: boolean;
    iconPosition: 'right' | 'left' | undefined | null;
    type: 'text' | 'password' | 'email' | undefined;
    icon: string | undefined | null;
    loading$: Observable<any>;
    formControl: FormControl;
    private _componentDestroyed$;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onChange: (value: string) => void;
    onTouched: () => void;
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    onBlur(): void;
    private _enableFormControl;
    private _disableFormControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextFieldComponent, "custom-text-field", never, { "placeholder": "placeholder"; "inputId": "inputId"; "isReadOnly": "readonly"; "disabled": "disabled"; "iconPosition": "iconPosition"; "type": "type"; "icon": "icon"; "loading$": "loading$"; }, {}, never, never, false, never>;
}
