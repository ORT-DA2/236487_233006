import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {combineLatest, map, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {authQuery} from '@auth/+data-access/store/auth.selectors';
import {articleQuery} from '@articles/+data-access/store/article/article.selectors';
import {articleActions} from "@articles/+data-access/store/article/article.actions";


/*
  Controls route access for art
*/


// FIXME : This guard should not exist, if user tries to acces a private article this should be managed by getArticle endpoint.
@Injectable({
  providedIn: 'root',
})
export class ArticleVisibilityGuard implements CanActivate {
  constructor(private store: Store, private router : Router) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.store.select(authQuery.selectLoggedUser),
      this.store.select(articleQuery.selectData),
    ]).pipe(
      map(([loggedUser, article]) => {
        if (article?.private && loggedUser?.id !== article.authorId) {
          // Reseteo el state del Article (que fue inicialiado por el article.guard)
          this.store.dispatch(articleActions.reset());
          this.router.navigate(['./private', 'articles']);
          return false;
        }
        return true;
      })
    );
  }
}
