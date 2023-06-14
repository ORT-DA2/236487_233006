import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";

@Injectable({ providedIn: 'root' })
export class LoadUsersResolver implements Resolve<void> {
	constructor(private readonly store: Store) {}
	
	resolve(route: ActivatedRouteSnapshot): void {
		this.store.dispatch(userListActions.loadUsers())
	}
}
