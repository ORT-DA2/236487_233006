import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {Route} from '@angular/router';
import {LayoutComponent} from '@layout/layout/layout.component';
import {articleListFeature} from "@articles/+data-access/store/article-list/article-list.reducers";
import {ArticleListEffects} from "@articles/+data-access/store/article-list/article-list.effects";
import {userListFeature} from "@users/+data-access/store/user-list/user-list.reducers";
import {UserListEffects} from "@users/+data-access/store/user-list/user-list.effects";
import {articleFeature} from "@articles/+data-access/store/article/article.reducers";
import {ArticleEffects} from "@articles/+data-access/store/article/article.effects";
import {LoadOffensiveWords} from "@layout/load-offensive-words.guard";
import {commentListFeature} from "@articles/+data-access/store/comment-list/comment-list.reducers";
import {CommentListEffects} from "@articles/+data-access/store/comment-list/comment-list.effects";
import {userFeature} from "@users/+data-access/store/user/user.reducers";
import {UserEffects} from "@users/+data-access/store/user/user.effects";

export default [
  {
    path: '', //                             -> /private
    component: LayoutComponent,
    canActivate: [LoadOffensiveWords],
    providers:[provideState(articleListFeature), provideEffects(ArticleListEffects)],
    children: [
      {
        path: '',
        redirectTo: '/private/articles',
        pathMatch: 'full'
      },
      {
        path: 'articles',                         //            /private/articles
        loadChildren: () => import('@articles/articles.routes'),
        providers: [
          provideState(articleFeature), provideEffects(ArticleEffects),
        ],
      },
      {
        path: 'users',                         //            /private/users
        loadChildren: () => import('@users/users.routes'),
        providers: [
          provideState(userListFeature), provideEffects(UserListEffects),
          provideState(commentListFeature), provideEffects(CommentListEffects),
          provideState(userFeature), provideEffects(UserEffects),
        ],
      },
    ]
  },
] as Route[];
