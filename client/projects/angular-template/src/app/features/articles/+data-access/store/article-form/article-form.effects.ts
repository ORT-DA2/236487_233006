import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {from, mergeMap, of, withLatestFrom} from 'rxjs';
import {catchError, concatMap, map, tap} from 'rxjs/operators';
import {ArticleService} from '../../services/article.service';
import {Action, Store} from '@ngrx/store';
import {articleFormActions} from "@articles/+data-access/store/article-form/article-form.actions";
import {formsActions, IOption, ngrxFormsQuery} from "@ui-components";
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {ToastrService} from "ngx-toastr";
import {FormImportData, ImportRequest} from "@articles/utils/types/article-form";
import {articleFormQuery} from "@articles/+data-access/store/article-form/article-form.selectors";

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
	
	
	
	importArticles$ = createEffect(() =>
		this.actions$.pipe(
			ofType(articleFormActions.importArticles),
			withLatestFrom(
				this.store.select(ngrxFormsQuery.selectData),
				this.store.select(articleFormQuery.selectImporterOptions)
			),
			concatMap(([_, formData, importerOptions]: [Action, FormImportData, IOption[]]) => {
				const importerName = this.getImporterNameById(formData.importerName, importerOptions);
				if (importerName) {
					const importRequest: ImportRequest = { importerName, filePath: formData.filePath };
					return this.articlesService.importArticles(importRequest).pipe(
						map((article) => articleFormActions.importArticlesSuccess({article})),
						catchError((result) => of(articleFormActions.importArticlesFailure({ error: result.error }))),
					);
				} else {
					return of(articleFormActions.importArticlesFailure({ error: "Invalid importer ID" }));
				}
			}),
		)
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
	
	onLoadImporterOptions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(articleFormActions.loadImporterOptions),
			concatMap(() =>
				this.articlesService.getImporterOptions().pipe(
					mergeMap((options) => from([
						articleFormActions.loadImporterOptionsSuccess({options}),
						formsActions.setOptions({key: 'importer1', options})
					])),
					catchError((result) => of(articleFormActions.loadImporterOptionsFailure({ error: result.error }))),
				),
			),
		),
	);
	
	aux = createEffect(() =>
		this.actions$.pipe(
			ofType(articleFormActions.loadImporterOptions),
			concatMap(() =>
				this.articlesService.getFakeOption1().pipe(
					mergeMap((options) => from([
						articleFormActions.loadImporterOptionsSuccess({options}),
						formsActions.setOptions({key: 'importer2', options})
					])),
					catchError((result) => of(articleFormActions.loadImporterOptionsFailure({ error: result.error }))),
				),
			),
		),
	);
	
	
	private getImporterNameById(id: number, options : IOption[]): string | null {
		const matchingOption = options.find(option => option.id === id);
		return matchingOption ? matchingOption.description : null;
	}
	constructor(
		private actions$: Actions,
		private store: Store,
		private articlesService: ArticleService,
		private router: Router,
		private toast : ToastrService
	) {}
}
