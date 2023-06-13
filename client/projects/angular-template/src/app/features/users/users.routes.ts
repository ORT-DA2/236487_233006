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
import {commentListFeature} from "@articles/+data-access/store/comment-list/comment-list.reducers";
import {CommentListEffects} from "@articles/+data-access/store/comment-list/comment-list.effects";
import {OffensiveCommentsGuard} from "@users/pages/offensive-comments/offensive-comments.guard";
import {UserNotificationsGuard} from "@users/pages/user-notifications/user-notifications.guard";

export default [
	{
		path: '', //                             -> /users
		component: UserListPageComponent,
		resolve : { LoadUsersResolver},
		canActivate : [RoleGuard],
		data : { requiredRoles : [RoleType.Admin] }           //  /private/users will be only for administrators
		
	},
	{
		path: 'profile',
		loadComponent: () => import('@users/pages/user-profile/user-profile.component'),
		providers: [provideState(userFeature), provideEffects(UserEffects)],
	},
	{
		path: 'notifications',
		loadComponent: () => import('@users/pages/user-notifications/user-notifications.component'),
		canActivate: [UserNotificationsGuard],
		providers: [
			provideState(articleFeature), provideEffects(ArticleEffects),
			provideState(commentListFeature), provideEffects(CommentListEffects)
		],
	},
	{
		path: 'offensive-articles',
		loadComponent: () => import('@users/pages/offensive-articles/offensive-articles.component'),
		providers: [provideState(userFeature), provideEffects(UserEffects)],
	},
	{
		path: 'offensive-comments',
		loadComponent: () => import('@users/pages/offensive-comments/offensive-comments.component'),
		canActivate: [OffensiveCommentsGuard],
		providers: [
			provideState(userFeature), provideEffects(UserEffects),
			provideState(commentListFeature), provideEffects(CommentListEffects)
		],
	},
	{
		path: 'offensive-words',
		loadComponent: () => import('@users/pages/offensive-words/offensive-words.component'),
	},
	{
		path: ':userId',
		loadComponent: () => import('@users/pages/more-from-author/more-form-author.component'),
		providers: [provideState(userFeature), provideEffects(UserEffects)],
	},
] as Route[];
