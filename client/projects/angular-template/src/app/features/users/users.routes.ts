import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {Route} from "@angular/router";
import UserListPageComponent from "@users/pages/user-list-page/user-list-page.component";
import {LoadUsersResolver} from "@users/utils/resolvers/load-users.resolver";
import {userFeature} from "@users/+data-access/store/user/user.reducers";
import {RoleType} from "@core";
import {UserEffects} from "@users/+data-access/store/user/user.effects";
import {RoleGuard} from "@auth/utils/guards/role.guard";
import {articleFeature} from "@articles/+data-access/store/article/article.reducers";
import {ArticleEffects} from "@articles/+data-access/store/article/article.effects";

export default [
	{
		path: '', //                             -> /users
		component: UserListPageComponent,
		resolve : { LoadUsersResolver},
		canActivate : [RoleGuard],
		data : { requiredRoles : [RoleType.Admin] }           //  /private/users will be only for administrators
	},
	{
		path: 'profile', //                        -> /users/me
		loadComponent: () => import('@users/pages/user-profile/user-profile.component'),
		providers: [provideState(userFeature), provideEffects(UserEffects)],
	},
	{
		path: 'article-management', //                        -> /users/me
		loadComponent: () => import('@users/pages/article-management/article-management.component'),
		providers: [provideState(userFeature), provideEffects(UserEffects)],
	},
	{
		path: 'comments',
		loadComponent: () => import('@users/pages/reply-to-comments/reply-to-comments.component'),
		providers: [provideState(articleFeature), provideEffects(ArticleEffects)],
	},
	{
		path: 'offensive-words', //                        -> /users/me
		loadComponent: () => import('@users/pages/offensive-word-management/offensive-word-management.component'),
	},
	{
		path: ':userId', //                    -> /users/1
		loadComponent: () => import('@users/pages/more-from-author/more-form-author.component'),
		providers: [provideState(userFeature), provideEffects(UserEffects)],
	},
] as Route[];
