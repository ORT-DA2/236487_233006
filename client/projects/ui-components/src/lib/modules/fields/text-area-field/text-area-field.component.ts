import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'custom-text-area-field',
  templateUrl: './text-area-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextAreaFieldComponent,
      multi: true,
    },
  ],
})
export class TextAreaFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input('readonly') isReadOnly: boolean = false;
  @Input() placeholder = "";
  @Input() inputId !: string;

  isDisabled: boolean = false;

  formControl: FormControl = new FormControl('');

  onChange = (value: string) => {};
  onTouched = () => {};

  private _componentDestroyed$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe(value => {
        this.onChange(value);
      });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  writeValue(value: string): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable({ emitEvent: false }) : this.formControl.enable({ emitEvent: false });
  }

  onBlur(): void {
    this.onTouched();
  }
}
