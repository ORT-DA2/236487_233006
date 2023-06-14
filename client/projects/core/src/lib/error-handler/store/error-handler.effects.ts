import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as ErrorHandlerActions from './error-handler.actions';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorHandlerEffects {
  on401$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorHandlerActions.throw401Error),
        tap(({error}) => this.toast.error(error.error,"Not Authorized")),
        tap(() => this.router.navigate(['/private/articles'])),
      ),
    { dispatch: false },
  );
  
  on403$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorHandlerActions.throw403Error),
        tap(() => this.router.navigate(['/access-denied'])),
      ),
    { dispatch: false },
  );

  on404$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorHandlerActions.throw404Error),
        tap(() => this.router.navigate(['/not-found'])),
      ),
    { dispatch: false },
  );

  constructor(private readonly actions$: Actions, private readonly router: Router, private toast : ToastrService) {}
}
