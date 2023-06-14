import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {filter, mapTo, Observable, of, take} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {wordsActions} from "@users/+data-access/store/offensive-words/offensive-words.actions";
import {wordsQuery} from "@users/+data-access/store/offensive-words/offensive-words.selectors";
import {authQuery} from "@auth/+data-access/store/auth.selectors";
import {switchMap, tap} from "rxjs/operators";
import {DialogService, DialogType, RoleType} from "@core";
import {ArticleService} from "@articles/+data-access/services/article.service";



@Injectable({ providedIn: 'root' })
export class LoadUserNotificationsGuard implements CanActivate {
  constructor(private readonly store: Store, private dialogService : DialogService, private articleService : ArticleService) {}
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return of(true)
  }
  
}



