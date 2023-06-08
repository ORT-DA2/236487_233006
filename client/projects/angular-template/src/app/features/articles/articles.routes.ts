import {Route} from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {ArticleFormEffects} from "@articles/+data-access/store/article-form/article-form.effects";
import {articleFormFeature} from "@articles/+data-access/store/article-form/article-form.reducers";
import {LoadArticleGuard} from "@articles/load-article.guard";
import {userFeature} from "@users/+data-access/store/user/user.reducers";
import {UserEffects} from "@users/+data-access/store/user/user.effects";
import {HomeComponent} from "@articles/pages/home/home.component";
import PersonalArticlesComponent from "@articles/pages/personal-articles/personal-articles.component";

export default [
  {
    path: '', //              -> /articles
    component: HomeComponent,
  },
  {
    path: 'personal',
    component: PersonalArticlesComponent,
  },

  // ------------------------ FORMS  ------------------------ //
  {
    path: 'new', //           Publish new article Form
    loadComponent: () => import('@articles/pages/article-form/article-form.component'),
    providers: [provideState(articleFormFeature), provideEffects(ArticleFormEffects)],
  },
  {
    path: ':articleId', //  Article
    loadComponent: () => import('@articles/pages/article/article.component'),
    providers: [provideState(userFeature), provideEffects(UserEffects)],
    canActivate: [LoadArticleGuard]
  },
  {
    path: ':articleId/edit', // Publish edited article Form
    loadComponent: () => import('@articles/pages/article-form/article-form.component'),
    providers: [provideState(articleFormFeature), provideEffects(ArticleFormEffects)],
    canActivate: [LoadArticleGuard]
  },
] as Route[];


// Clean route architecture:

/*
const routes: Routes = [
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/new', component: ArticleComponent },
  { path: 'articles/:id', component: ArticleComponent },
  { path: 'articles/:id/edit', component: ArticleComponent },
  { path: 'articles/:id/delete', component: ArticleComponent }
];


CanActivateGuard:
This is a route guard used to prevent a route from activating. If you return false from the canActivate method, the navigation will be cancelled.
This is primarily used for things like checking if a user is authenticated and if they have the right permissions to access a route.
In your ArticleGuardService, the canActivate method is used to load the article and its comments, and if successful (i.e., it returns true),
the route will be activated.

Resolver:
A Resolver is used to pre-fetch data before the route is activated. The main purpose of this is to have the data ready before loading the component.
This avoids the possibility of the component rendering with no data or with partial data. In your ArticleEditResolverService, the resolve method checks
if a slug is available, and if it is, it dispatches an action to load the article.It then immediately returns true, signaling that the route can be activated.


So why use one over the other? It depends on the requirements:

If you want to load some data and based on that data decide whether you should allow navigating to a route, use a CanActivateGuard.

If you want to load some data before navigating to a route but you don't want to use that data to decide if the route should be activated or not, use a Resolver.

*/
