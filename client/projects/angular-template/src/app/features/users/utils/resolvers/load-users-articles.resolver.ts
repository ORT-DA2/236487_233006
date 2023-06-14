import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {userActions} from "@users/+data-access/store/user/user.actions";
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {of} from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoadUsersArticlesResolver implements Resolve<void> {
	constructor(private readonly store: Store) {}
	
	resolve(route: ActivatedRouteSnapshot): void {
		const userId = route.params['userId'];
		
		console.log("userId", userId)
		this.store.dispatch(articleListActions.reset())
		this.store.dispatch(userActions.loadUser({userId}));
		this.store.dispatch(articleListActions.loadUserArticles({ userId }));
	}
}
