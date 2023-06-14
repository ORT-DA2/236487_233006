import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, of} from 'rxjs';
import {DialogService, DialogType} from "@core";
import {tap} from "rxjs/operators";
import {UserService} from "@users/+data-access/services/user.service";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {ngrxFormsQuery} from "@ui-components";
import {Store} from "@ngrx/store";

@Injectable()
export class UserListEffects {
  
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListActions.loadUsers),
      concatMap((action) =>
        this.userService.getAll().pipe(
          map((users) =>
            userListActions.loadUsersSuccess({users} )
          ),
          catchError((error) =>
            of(userListActions.loadUsersFailure(error))
          )
        )
      )
    )
  );
  
  loadUsersRanking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListActions.loadUsersRanking),
      concatLatestFrom(() => this.store.select(ngrxFormsQuery.selectData)),
      concatMap(([_ , {startDate, endDate}]) =>
        this.userService.getUserRankings(startDate, endDate).pipe(
          map((users) =>
            userListActions.loadUsersSuccess({users} )
          ),
          catchError((error) =>
            of(userListActions.loadUsersFailure(error))
          )
        )
      )
    )
  );
  
  // SideEffect that closes dialogs is opened
  onLoadUsersSuccess$ =createEffect(() =>
    this.actions$.pipe(ofType(userListActions.loadUsersSuccess),
      tap((a) => {
        this.dialogService.closeDialog(DialogType.Delete);
        this.dialogService.closeDialog(DialogType.User);
        
      })
      
    ),
{dispatch: false}
)
  
  
  createNewUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListActions.createNewUser),
      concatMap(({user}) =>
        this.userService.createNewUser(user).pipe(
          map((users) => userListActions.loadUsers()),
          catchError((error) =>
            of(userListActions.createNewUserFailure(error))
          )
        )
      )
    )
  );
  
  
  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListActions.editUser),
      concatMap(({user}) =>
        this.userService.editUser(user).pipe(
          map((users) =>
            userListActions.loadUsers()
          ),
          catchError((error) =>
            of(userListActions.editUserFailure(error))
          )
        )
      )
    )
  );
  
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListActions.deleteUser),
      concatMap(({userId}) =>
        this.userService.delete(userId).pipe(
          map(response => userListActions.loadUsers())
        )
      )
    )
  )
  
  
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private readonly dialogService : DialogService,
    private readonly store : Store
  ) {}
}
