import { AbstractControl, FormControl } from '@angular/forms';

function validationIdDigit(ci: string): number {
  let a = 0;

  if (ci.length <= 6) {
    for (let i = ci.length; i < 7; i++) {
      ci = '0' + ci;
    }
  }

  for (let i = 0; i < 7; i++) {
    a += (parseInt('2987634'[i], 10) * parseInt(ci[i], 10)) % 10;
  }

  if (a % 10 === 0) return 0;
  else return 10 - (a % 10);
}

export function ValidateIdNumber(control: AbstractControl): any {
  if (control.value) {
    let ci = control.value;
    const dig = ci[ci.length - 1];

    if (ci === '') return { required: true };
    else if (
      ci.length !== 8 ||
      dig != validationIdDigit(ci.replace(/[0-9]$/, ''))
    )
      return { invalid: true };

    return null;
  } else {
    return null;
  }
}
