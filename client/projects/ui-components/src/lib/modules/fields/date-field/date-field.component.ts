// Angular Core
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// Angular Forms
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
// Interfaces
import { CalendarTypeView } from 'primeng/calendar';
// RxJs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'custom-date-field',
  templateUrl: './date-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateFieldComponent,
      multi: true,
    },
  ],
  styles: [`
  `]
})
export class DateFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input('readonly') isReadOnly = false;
  @Input() inputId!: string;
  @Input() disabled = false;

  @Input() showIcon = true;
  @Input('min') minDate: Date = new Date(0);
  @Input('max') maxDate!: Date;
  @Input('format') dateFormat = 'dd/mm/yy';
  @Input() view: CalendarTypeView = 'date';
  @Input() placeholder!: string;

  public formControl = new FormControl<Date | null>(null);
  public isDisabled = false;

  public onChange = (value: Date | null) => {};
  public onTouched = () => {};

  private _componentDestroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((value) => this.onChange(value));
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  public writeValue(value: Date): void {
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

  public onBlur(): void {
    this.onTouched();
  }

  private _enableFormControl(): void {
    this.formControl.enable({ emitEvent: false });
  }

  private _disableFormControl(): void {
    this.formControl.disable({ emitEvent: false });
  }
}
