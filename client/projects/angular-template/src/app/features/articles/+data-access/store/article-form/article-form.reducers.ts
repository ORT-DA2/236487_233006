import {createFeature, createReducer, on} from "@ngrx/store";
import {articleFormActions} from "@articles/+data-access/store/article-form/article-form.actions";

export interface ArticleFormState {
	loaded: boolean;
	loading: boolean;
	error : string | null
}

export const articleFormInitialState: ArticleFormState = {
	loaded: false,
	loading: false,
	error : null
};

export const articleFormFeature = createFeature({
	name: 'articleForm',
	reducer: createReducer(
		articleFormInitialState,
		on(articleFormActions.reset, () => articleFormInitialState),
		on(articleFormActions.publishArticle, (state) => {
			return {
				...state,
				loading: true,
				error : null
			};
		}),
		on(articleFormActions.publishArticleSuccess, (state ) => {
			return {
				...state,
				loaded: true,
				loading: false,
				error : null
			};
		}),
		on(articleFormActions.publishArticleFailure, (state, action) => {
			return {
				...state,
				loaded: false,
				loading: false,
				error : action.error
			};
		}),
	),
});