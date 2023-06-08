import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, concatMap, map, tap} from 'rxjs/operators';
import {ArticleService} from '../../services/article.service';
import {Store} from '@ngrx/store';
import {articleFormActions} from "@articles/+data-access/store/article-form/article-form.actions";
import {ngrxFormsQuery} from "@ui-components";
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ArticleFormEffects {
	
	publishArticle$ = createEffect(() =>
		this.actions$.pipe(
			ofType(articleFormActions.publishArticle),
			concatLatestFrom(() => this.store.select(ngrxFormsQuery.selectData)),
			concatMap(([_, data]) =>
				this.articlesService.publishArticle(data).pipe(
					tap((article) => this.router.navigate(['/private/articles', article.id])),
					map((article) => articleFormActions.publishArticleSuccess({article})),
					catchError((result) => of(articleFormActions.publishArticleFailure({ error: result.error }))),
				),
			),
		),
	);
	
	
	// SideEffect that shows toast if published article has offensive word
	onPublishArticleSuccess$ =createEffect(() =>
			this.actions$.pipe(ofType(articleFormActions.publishArticleSuccess),
				tap(({article}) =>{
					if(!article.isApproved) this.toast.info("Article has been put under review because it contains offensive words. Once it is approved it will be visible for other users", "Article under revision", { tapToDismiss : false, timeOut: 20000 , closeButton :true})
				}),
			),
		{dispatch: false}
	)
	
	constructor(
		private actions$: Actions,
		private store: Store,
		private articlesService: ArticleService,
		private router: Router,
		private toast : ToastrService
	) {}
}
