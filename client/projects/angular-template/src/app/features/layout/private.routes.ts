import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {Route} from '@angular/router';
import {LayoutComponent} from '@layout/layout/layout.component';
import {articleListFeature} from "@articles/+data-access/store/article-list/article-list.reducers";
import {ArticleListEffects} from "@articles/+data-access/store/article-list/article-list.effects";
import {RoleGuard} from "@auth/utils/guards/role.guard";
import {RoleType} from "@core";
import {userListFeature} from "@users/+data-access/store/user-list/user-list.reducers";
import {UserListEffects} from "@users/+data-access/store/user-list/user-list.effects";
import {articleFeature} from "@articles/+data-access/store/article/article.reducers";
import {ArticleEffects} from "@articles/+data-access/store/article/article.effects";

export default [
  {
    path: '', //                             -> /private
    component: LayoutComponent,
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
          provideState(articleListFeature),
          provideState(articleFeature),
          provideEffects(ArticleListEffects),
          provideEffects(ArticleEffects)
        ],
      },
      {
        path: 'users',                         //            /private/users
        loadChildren: () => import('@users/users.routes'),
        providers: [
          provideState(userListFeature),
          provideEffects(UserListEffects),
          provideState(articleListFeature),
          provideEffects(ArticleListEffects),
        ],
      },
    ]
  },
] as Route[];
