import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";

@Injectable({ providedIn: 'root' })
export class PublicArticlesResolver implements Resolve<Observable< boolean>> {
	
	constructor(private readonly store: Store) {}
	
	resolve(route: ActivatedRouteSnapshot): Observable< boolean> {
		this.store.dispatch(articleListActions.reset())
		this.store.dispatch(articleListActions.loadAllArticles())
		return of(false)
	}
}
