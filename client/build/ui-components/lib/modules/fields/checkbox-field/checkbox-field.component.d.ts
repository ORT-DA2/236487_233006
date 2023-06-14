import { ControlValueAccessor, FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class CheckboxFieldComponent implements ControlValueAccessor {
    isReadOnly: boolean;
    inputId: string;
    label: string;
    disabled: boolean;
    private componentDestroyed$;
    formControl: FormControl<boolean | null>;
    onChange: (value: boolean | null) => void;
    onTouched: () => void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    onCheckChange(): void;
    private _enableFormControl;
    private _disableFormControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxFieldComponent, "custom-checkbox-field", never, { "isReadOnly": "readonly"; "inputId": "inputId"; "label": "label"; "disabled": "disabled"; }, {}, never, never, false, never>;
}
