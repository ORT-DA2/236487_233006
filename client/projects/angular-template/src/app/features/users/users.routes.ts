import {Route} from "@angular/router";
import UserListPageComponent from "@users/pages/user-list/user-list-page.component";
import {LoadUsersResolver} from "@users/utils/resolvers/load-users.resolver";
import {RoleType} from "@core";
import {RoleGuard} from "@auth/utils/guards/role.guard";
import {OffensiveCommentsGuard} from "@users/pages/offensive-comments/offensive-comments.guard";
import {UserNotificationsGuard} from "@users/pages/user-notifications/user-notifications.guard";

export default [
	{
		path: '', //                             -> /users
		component: UserListPageComponent,
		resolve : { LoadUsersResolver},
		canActivate : [RoleGuard],
		data : { requiredRoles : [RoleType.Admin] },           //  /private/users will be only for administrators
		
	},
	{
		path: 'profile',
		loadComponent: () => import('@users/pages/user-profile/user-profile.component'),
	},
	{
		path: 'notifications',
		loadComponent: () => import('@users/pages/user-notifications/user-notifications.component'),
		canActivate: [UserNotificationsGuard],
	},
	{
		path: 'offensive-articles',
		loadComponent: () => import('@users/pages/offensive-articles/offensive-articles.component'),
		canActivate : [RoleGuard],
		data : { requiredRoles : [RoleType.Admin] },
	},
	{
		path: 'ranking',
		loadComponent: () => import('@users/pages/users-ranking/users-ranking.component'),
		canActivate : [RoleGuard],
		data : { requiredRoles : [RoleType.Admin] },
	},
	{
		path: 'offensive-comments',
		loadComponent: () => import('@users/pages/offensive-comments/offensive-comments.component'),
		canActivate: [OffensiveCommentsGuard, RoleGuard],
		data : { requiredRoles : [RoleType.Admin] },
	},
	{
		path: 'offensive-words',
		loadComponent: () => import('@users/pages/offensive-words/offensive-words.component'),
		canActivate : [RoleGuard],
		data : { requiredRoles : [RoleType.Admin] },
	},
	{
		path: ':userId',
		loadComponent: () => import('@users/pages/more-from-author/more-form-author.component'),
	},
] as Route[];
