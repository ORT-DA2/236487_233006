import {UserValidationService} from '@shared/services/user-validation.service';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from "@angular/core";

// export function uniqueEmailValidator(
//   registerService: UserValidationService
// ): AsyncValidatorFn {
//   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//     return timer(300).pipe(
//       switchMap(() => {
//         return registerService.checkEmail(control.value).pipe(
//           map((emailExists) => (emailExists.length ? {emailExists: true} : null))
//         );
//       })
//     );
//   };
// }


@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private registerService: UserValidationService) {}
  
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() => {
        return this.registerService.checkEmail(control.value).pipe(
          map((emailExists) => (emailExists.length ? { emailExists: true } : null))
        );
      })
    );
  }
}
