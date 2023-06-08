// Angular Core
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// Angular Forms
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'custom-number-field',
  templateUrl: './number-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberFieldComponent,
      multi: true,
    },
  ],
})
export class NumberFieldComponent implements  OnInit, OnDestroy,ControlValueAccessor {
  // P-Input API
  @Input() placeholder: string = ""

  @Input() minFractionDigits = 0;
  @Input() maxFractionDigits = 0;

  @Input() min = Number.MIN_VALUE;
  @Input() max = Number.MAX_VALUE;

  @Input() maxLength = 0;
  @Input() locale = 'de-DE';

  @Input() prefix = '';
  @Input() suffix = '';
  @Input() set disabled(disabled: boolean) {
    disabled ? this._disableFormControl() : this._enableFormControl()
  }

  @Input() useGrouping = true;
  @Input() inputId!: string;

  // Custom SBI API
  @Input('readonly') isReadOnly = false;

  // Reference to the formControl that Im accessing
  // (this is the value of the formControl inside the p-inputNumber
  public formControl = new FormControl<number | null>(null);
  public isDisabled = false;

  public onChange = (value: number | null) => {};
  public onTouched = () => {};

  private _destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this._destroyed$))
      .subscribe(value => {
         this.onChange(value);
      });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public writeValue(value: number): void {
    if(value) this.formControl.setValue(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(disabled: boolean): void {
    disabled ? this._disableFormControl() : this._enableFormControl();
  }

  // On browser Blur event Im marking my formControl as touched
  public onBlur(): void {
    this.onTouched();
  }

  private _enableFormControl() : void{
    this.formControl.enable({ emitEvent: false });
  }

  private _disableFormControl() : void {
    this.formControl.disable({ emitEvent: false });
  }
}
