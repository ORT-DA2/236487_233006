import {createFeature, createReducer, on} from "@ngrx/store";
import {articleFormActions} from "@articles/+data-access/store/article-form/article-form.actions";
import {IOption} from "@ui-components";

export interface ArticleFormState {
	loaded: boolean;
	loading: boolean;
	error : string | null
	importerOptions : IOption[]
}

export const articleFormInitialState: ArticleFormState = {
	loaded: false,
	loading: false,
	error : null,
	importerOptions : []
};

export const articleFormFeature = createFeature({
	name: 'articleForm',
	reducer: createReducer<ArticleFormState>(
		articleFormInitialState,
		on(articleFormActions.reset, () => articleFormInitialState),
		on(articleFormActions.publishArticle, articleFormActions.loadImporterOptions, articleFormActions.importArticles, (state) => {
			return {
				...state,
				loading: true,
				error : null
			};
		}),
		on(articleFormActions.publishArticleSuccess, articleFormActions.importArticlesSuccess, (state ) => {
			return {
				...state,
				loaded: true,
				loading: false,
				error : null
			};
		}),
		on(articleFormActions.loadImporterOptionsSuccess, (state, {options} ) => {
			return {
				...state,
				importerOptions : options,
				loaded: true,
				loading: false,
				error : null
			};
		}),
		on(articleFormActions.publishArticleFailure, articleFormActions.loadImporterOptionsFailure, articleFormActions.importArticlesFailure, (state, action) => {
			return {
				...state,
				loaded: false,
				loading: false,
				error : action.error
			};
		}),
	),
});
