import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const CheckPasswordsMatch: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password');
  const passwordConfirmation = group.get('passwordConfirmation');

  if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
    return { passwordsNotMatch: true };
  }

  return null;
};
