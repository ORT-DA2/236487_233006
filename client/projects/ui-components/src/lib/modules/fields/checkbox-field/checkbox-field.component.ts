// Angular Core
import { Component, Input } from '@angular/core';
// Angular Forms
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'custom-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxFieldComponent,
      multi: true,
    },
  ],
})
export class CheckboxFieldComponent implements ControlValueAccessor {
  
  @Input('readonly') isReadOnly = false;
  @Input() inputId !: string;
  @Input() label = "";
  @Input() disabled = false;

  private componentDestroyed$ = new Subject<void>();
  public formControl = new FormControl(false);
  
  public onChange = (value: boolean | null) => {};
  public onTouched = () => {};
  
  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => {
        this.onChange(value);
      });
  }
  
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
  
  
  public writeValue(value: boolean): void {
    this.formControl.setValue(value);
  }
  
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this._disableFormControl() : this._enableFormControl();
  }

  public onCheckChange(): void {
    this.onTouched();
  }

  private _enableFormControl(): void {
    this.formControl.enable({ emitEvent: false });
  }

  private _disableFormControl(): void {
    this.formControl.disable({ emitEvent: false });
  }
  
}
