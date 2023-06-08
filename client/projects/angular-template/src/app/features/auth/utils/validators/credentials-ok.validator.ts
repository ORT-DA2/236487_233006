import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of, timer} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from "@auth/+data-access/services/auth.service";

export function credentialsOkValidator(
  authService: AuthService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      switchMap(() => {
        return authService.login(control.value).pipe(
          tap(fc => console.log(fc)),
          map((authToken) => authToken ?  null : {invalidCredentials : true}),
          catchError(() => of({invalidCredentials : true}))
        );
      })
    );
  };
}

