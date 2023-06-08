import {AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {UserValidationService} from '@shared/services/user-validation.service';
import {Injectable} from "@angular/core";


export function uniqueUsernameValidator(registerService: UserValidationService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      switchMap(() => {
        return registerService.checkUsername(control.value).pipe(
          map((usernameExists) => (usernameExists.length ? {usernameExists: true} : null))
        );
      })
    );
  };
}


@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private registerService: UserValidationService) {}
  
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() => {
        return this.registerService.checkUsername(control.value).pipe(
          map((usernameExists) => (usernameExists.length ? { usernameExists: true } : null))
        );
      })
    );
  }
}
