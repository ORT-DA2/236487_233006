// Angular Core
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// Angular Forms
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
// RxJs
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'custom-text-field',
  templateUrl: './text-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextFieldComponent,
      multi: true,
    },
  ],
})
export class TextFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  
  @Input() placeholder : string | undefined = '';
  @Input() inputId!: string;
  @Input('readonly') isReadOnly = false;
  @Input() disabled = false;
  @Input() iconPosition: 'right' | 'left'| undefined | null = null;
  @Input() type: 'text' | 'password' | 'email'| undefined = "text";
  @Input() icon: string | undefined | null = null;
  @Input() loading$ !: Observable<any>
  
  
  public formControl: FormControl = new FormControl<string | null>(
    '',
  );

  private _componentDestroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((value) => {
        this.onChange(value);
      });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  public onChange = (value: string) => {};
  public onTouched = () => {};

  public writeValue(value: string): void {
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
