import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {StyleClassModule} from "primeng/styleclass";
import {RippleModule} from "primeng/ripple";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {BadgeModule} from "primeng/badge";
import {BehaviorSubject, Observable} from "rxjs";
import {authQuery} from "@auth/+data-access/store/auth.selectors";
import {Store} from "@ngrx/store";
import {authActions} from "@auth/+data-access/store/auth.actions";
import {AsyncPipe, NgIf} from "@angular/common";
import {RoleType} from "@core";
import {RequiredRolesDirective} from "@auth/utils/dierctives/required-roles.directive";
import {User} from "@shared/domain";
import {AvatarModule} from "primeng/avatar";
import {take, tap} from "rxjs/operators";
import {CommentsService} from "@articles/+data-access/services/comments.service";



@Component({
  selector: 'navbar',
  standalone: true,
	imports: [
		StyleClassModule,
		RippleModule,
		RouterLink,
		BadgeModule,
		NgIf,
		AsyncPipe,
		RouterLinkActive,
		RequiredRolesDirective,
		AvatarModule,
	],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy{
  user$ : Observable<User | null>= this.store.select(authQuery.selectLoggedUser)
	
	
  roleType = RoleType
  
  constructor(private readonly store : Store, public commentsService : CommentsService) {}
  
  logout(){
    this.store.dispatch(authActions.logout())
  }
	
	showAdminOptions$ = new BehaviorSubject<boolean>(false);
	showUserOptions$ = new BehaviorSubject<boolean>(false)
	
	
	ngOnInit() {
		this.commentsService.getUserNotifications().pipe(take(1)).subscribe(notifications => this.commentsService.userNotifications$.next(notifications.toString()))
	}
	
	ngOnDestroy() {
	}
}
