import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {filter, mapTo, Observable, of, take} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {wordsActions} from "@users/+data-access/store/offensive-words/offensive-words.actions";
import {wordsQuery} from "@users/+data-access/store/offensive-words/offensive-words.selectors";
import {authQuery} from "@auth/+data-access/store/auth.selectors";
import {switchMap, tap} from "rxjs/operators";
import {RoleType} from "@core";



@Injectable({ providedIn: 'root' })
export class LoadOffensiveWords implements CanActivate {
  constructor(private readonly store: Store) {}
  
  waitForOffensiveWordsToLoad(): Observable<boolean> {
    return this.store.select(wordsQuery.selectLoaded).pipe(
      filter((loaded) => loaded),
      take(1),
    );
  }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(authQuery.selectLoggedUser).pipe(
      switchMap(user => {
        if (user && user.roles.includes(RoleType.Admin)) {
          // If user is admin, dispatch loadWords action
          this.store.dispatch(wordsActions.loadWords());
          // Wait for words to load, then return true
          return this.waitForOffensiveWordsToLoad();
        } else {
          // If user is not admin, return true immediately
          return of(true);
        }
      }),
      take(1)
    );
  }
  
}

/*
The canActivate guard in Angular is a type of route guard that is used to protect a route and prevent unauthorized access.
It is used to prevent users from accessing certain routes if they do not have the necessary permissions or if they are
not authenticated.

The canActivate guard is a function that is executed before a route is activated.
It takes the current ActivatedRouteSnapshot and the current RouterStateSnapshot as parameters and returns either true or false.
If it returns true, then the route is activated,
If it returns false, then the route is blocked, and user should be redirected to a different route.

 */


