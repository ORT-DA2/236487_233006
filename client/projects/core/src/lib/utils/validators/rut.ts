import { FormControl } from '@angular/forms';

function rutValidationDigit(rut: string): number {
  let count = 0;
  const data = '43298765432';

  data.split('').forEach((dig, i) => {
    count += parseInt(dig) * parseInt(rut[i]);
  });

  const result = count % 11;

  if (result === 0) return 0;
  else return (11 - result);
}

export function ValidateRUT(control: FormControl) {
  const rut = control.value || '';
  const value = rut;

  // if (rut === '') return { required: true };
  if (rut === '') return null;

  const dig = value[value.length - 1];
  if (value === '' || value.length !== 12 || dig != rutValidationDigit(value)) return { invalid: true }

  return null;
}
