import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {Store} from "@ngrx/store";
import {combineLatest, filter, Observable, of, take} from "rxjs";
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {articleListQuery} from "@articles/+data-access/store/article-list/article-list.selectors";
import {userActions} from "@users/+data-access/store/user/user.actions";
import {userQuery} from "@users/+data-access/store/user/user.selectors";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class LoadUserArticlesGuard implements CanActivate {
	constructor(private readonly store: Store) {}
	
	waitForUserToLoad(): Observable<boolean> {
		return this.store.select(userQuery.selectLoaded).pipe(
			filter((loaded) => loaded),
			take(1),
		);
	}
	
	waitForArticleToLoad(): Observable<boolean> {
		return this.store.select(articleListQuery.selectLoaded).pipe(
			filter((loaded) => loaded),
			take(1),
		);
	}
	
	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		const userId = route.params['userId'];
		console.log("userId", userId)
		this.store.dispatch(userActions.loadUser({userId}));
		this.store.dispatch(articleListActions.loadUserArticles({ userId }));
		
		return of(true)
	}
}
