import {AbstractControl} from '@angular/forms';
import {REGEX} from '@core';

export function ValidateNoWhitespace(control: AbstractControl): any {
  const value: string = control.value;
  if (!value) return null;

  if (value.match(REGEX.NO_WHITESPACE)) return null;
  else return { whitespacePattern: true };
}
