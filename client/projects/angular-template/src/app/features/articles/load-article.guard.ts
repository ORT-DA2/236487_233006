import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {filter, Observable, take} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {articleQuery} from "@articles/+data-access/store/article/article.selectors";


/*
  Responsible for providing initialization logic for PublishArticleForm,
  when editting an article
*/
@Injectable({ providedIn: 'root' })
export class LoadArticleGuard implements CanActivate {
  constructor(private readonly store: Store) {}
  
  waitForArticleToLoad(): Observable<boolean> {
    return this.store.select(articleQuery.selectLoaded).pipe(
      filter((loaded) => loaded),
      take(1),
    );
  }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    
    
    
    const articleId = route.params['articleId'];
    this.store.dispatch(articleActions.loadArticle({ articleId }));
    
    return this.waitForArticleToLoad()
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


