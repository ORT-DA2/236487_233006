import {AuthService} from '../services/auth.service'

import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects'
import {mergeMap, of, withLatestFrom} from 'rxjs'
import {catchError, exhaustMap, map, tap} from 'rxjs/operators'

import {authActions} from './auth.actions'
import {LocalStorageService} from '../services/local-storage.service'
import {Store} from '@ngrx/store'
import {authQuery} from '@auth/+data-access/store/auth.selectors'
import {ToastrService} from 'ngx-toastr'
import {DialogService, DialogType} from '@core'

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  onLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatLatestFrom(() => this.store.select(authQuery.selectLoginData)),
      exhaustMap(([, data]) =>
        this.authService.login(data!).pipe(
          map((data) => authActions.loginSuccess({ data })),
          catchError(({ error }) => of(authActions.loginFailure({ error })))
        )
      )
    )
  )

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(({ data }) => {
          // On LoginSuccess I save the token in local storage
          this.localStorageService.setUser(data)
          // Navigate to dashboard
          this.router.navigate(['/private'])
        })
      ),
    { dispatch: false }
  )
  

  onRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      exhaustMap(({ newUser }) =>
        this.authService.register(newUser).pipe(
          map((response) => authActions.registerSuccess()),
          catchError((error) => of(authActions.registerFailure(error))
          )
        )
      )
    )
  )

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(() => {
          this.dialogManager.closeDialog(DialogType.Register)
          this.toast.success('Register success')
        })
      ),
    { dispatch: false }
  )

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        mergeMap(() =>
          this.authService.logout().pipe(
            tap(() => {
              this.localStorageService.removeUser()
              this.router.navigateByUrl('/login')
            }),
            catchError(() => of())
          )
        )
      ),
    { dispatch: false }
  )
  
  
  onUpdateLoggedUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.updateLoggedUser),
        withLatestFrom(this.store.select(authQuery.selectToken)),
        tap(([{user}, token]) => {
          this.localStorageService.setUser({user, token})
        })
      ),
    { dispatch: false }
  )

  constructor(
    private readonly actions$: Actions,
    private readonly localStorageService: LocalStorageService,
    private readonly store: Store,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toast: ToastrService,
    private readonly dialogManager: DialogService
  ) {}
}
