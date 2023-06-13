import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {Store} from "@ngrx/store";
import {filter, Observable, take} from "rxjs";
import {commentListActions} from "@articles/+data-access/store/comment-list/comment-list.actions";
import {commentListQuery} from "@articles/+data-access/store/comment-list/comment-list.selectors";

@Injectable({ providedIn: 'root' })
export class UserNotificationsGuard implements CanActivate {
	constructor(private readonly store: Store) {}
	
	waitForCommentsToLoad(): Observable<boolean> {
		return this.store.select(commentListQuery.selectLoaded).pipe(
			filter((loaded) => loaded),
			take(1),
		);
	}
	
	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		this.store.dispatch(commentListActions.loadMyComments());
		return this.waitForCommentsToLoad()
	}
}
