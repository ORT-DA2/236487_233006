import { FormControl } from '@angular/forms';

export function ValidatePhoneNumber(control: FormControl): any {
  const reg: string = control.value.toString();

  if (reg === '') return null;

  const cellphone = /^0(91|92|93|94|95|96|97|98|99)[0-9]{6}$/;
  const phoneRest = /^4(2|33|47|45|64|62|77|73|72|56|54|52|34|35|44|36|63)[0-9]{5,6}$/;
  const phoneMontevideo = /^2[0-9]{7}$/;

  if (reg.match(cellphone) || reg.match(phoneRest) || reg.match(phoneMontevideo)) return null;
  else return { invalid: true };
}
