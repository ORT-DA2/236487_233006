import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from "@users/+data-access/services/user.service";
import {catchError, map, tap} from "rxjs/operators";
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {concatMap, of} from "rxjs";
import {userActions} from "@users/+data-access/store/user/user.actions";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {DialogType} from "@core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {authActions} from "@auth/+data-access/store/auth.actions";

@Injectable()
export class UserEffects {
  
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      concatMap(({ userId }) =>
        this.userService.getSpecificUser(userId).pipe(
          map(( user ) =>
            userActions.loadUserSuccess({ user })
          ),
          catchError((error) => of(articleActions.loadArticleFailure(error)))
        )
      )
    )
  );
  
  editUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.editUserProfile),
      concatMap(({user}) =>
        this.userService.editUser(user).pipe(
          map((user) =>
            userActions.editUserProfileSuccess({user})
          ),
          catchError((error) =>
            of(userActions.editUserProfileFailure(error))
          )
        )
      )
    )
  );
  
  
  // SideEffect that closes dialogs is opened
  onEditProfileSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.editUserProfileSuccess),
      tap((a) => {
        this.toast.success("User Profile has been modified", "Success")
        this.router.navigate(['./private', 'articles', 'personal'])
      }),
      map(({ user }) => authActions.updateLoggedUser({ user }))
    )
  )
  
  
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private toast : ToastrService,
    private router : Router
  ) {}
}
