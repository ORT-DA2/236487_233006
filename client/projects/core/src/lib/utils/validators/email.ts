import { AbstractControl, FormControl } from '@angular/forms';

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export function ValidateEmail(control: AbstractControl): any {
  const value: string = control.value;
  if (!value) return null;

  const emailregex = EMAIL_REGEX;

  if (emailregex.test(value)) return null;
  else return { emailPattern: true };
}
