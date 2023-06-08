import {AbstractControl} from '@angular/forms';
import {REGEX} from '@core';

export function ValidateAlphanumeric(control: AbstractControl): any {
  const value: string = control.value;
  if (!value) return null;

  if (value.match(REGEX.ALPHANUMERIC)) return null;
  else return { alphanumericPattern: true };
}
