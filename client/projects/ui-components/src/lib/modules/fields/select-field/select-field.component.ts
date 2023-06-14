import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface IOption {
  id: any;
  description: string;
}

@Component({
  selector: 'custom-select-field',
  templateUrl: './select-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectFieldComponent,
      multi: true,
    },
  ],
})
export class SelectFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input('readonly') isReadOnly: boolean = false;
  @Input() inputId!: string;
  @Input() options: IOption[] = [];
  @Input() multiSelect = false;
  @Input() disabled = false;
  @Input() showClear = false

  @Input() placeholder !: string;
  
  public formControl = new FormControl<IOption | IOption[] | null>(null);
  public displayValue: any;
  public hasValue: boolean = false;

  private _componentDestroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((value) => {
        this.displayValue = value;
        this.hasValue = Array.isArray(value) ? !!value.length : !!value;
        this.onChange(value);
      });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  public onChange = (value: any | any[] | null) => {};
  public onTouched = () => {};
  
  
  public writeValue(value: any | any[]): void {
    if (Array.isArray(value)) {
      // MultiSelect
      const fullOptions = value.map(id => this.getFullOptionFromId(id));
      this.formControl.setValue(fullOptions as IOption[]);
    } else {
      // Select
      const fullOption = this.getFullOptionFromId(value);
      this.formControl.setValue(fullOption);
    }
  }
  
  public registerOnChange(fn: any): void {
    this.onChange = (value: IOption | IOption[] | null) => {
      if (Array.isArray(value)) {
        const ids = value.map(option => this.getIdFromOption(option));
        fn(ids);
      } else {
        const id = this.getIdFromOption(value!);
        fn(id);
      }
    };
  }
  
  // Busco en la lista de opciones la opción cuyo ID coincide con el que proporcionamos.
  // Si no encontramos una opción que coincida, retorno null.
  private getFullOptionFromId(id: any): IOption | null{
    return this.options.find(option => option.id === id) || null;
  }
  
  private getIdFromOption(option: IOption): any {
    return option ? option.id : null;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this._disableFormControl() : this._enableFormControl();
  }

  private _enableFormControl(): void {
    this.formControl.enable({ emitEvent: false });
  }

  private _disableFormControl(): void {
    this.formControl.disable({ emitEvent: false });
  }
}
