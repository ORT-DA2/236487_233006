import {createFeature, createReducer, on} from '@ngrx/store';
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {Article} from "@shared/domain";

export interface ArticleListState {
  articles: Article[];
  loaded: boolean;
  loading: boolean;
  error : string | null
  count : number
  editing : boolean
}

export const articleListInitialState: ArticleListState = {
  articles: [],
  count : 0,
  loaded: false,
  loading: false,
  error : null,
  editing : false
};

export const articleListFeature = createFeature({
  name: 'articleList',
  reducer: createReducer(
    articleListInitialState,
    on(articleListActions.reset, () => articleListInitialState),
    on(articleListActions.loadRecentArticles, (state) => {
      return {
        ...state,
        loading: true,
        editing: false,
      };
    }),
    on(articleListActions.loadUserArticles, articleListActions.loadOffensiveArticles, (state) => {
      return {
        ...state,
        loading: true,
        editing: false,
      };
    }),
    on(articleListActions.loadMyArticles, (state) => {
      return {
        ...state,
        loading: true,
        editing: true,
      };
    }),
    on(articleListActions.loadArticlesSuccess, (state, {articles} ) => {
      return {
        ...state,
        articles: articles,
        count : 10,
        loaded: true,
        loading: false,
        error : articleListInitialState.error
      };
    }),
    on(articleListActions.loadArticlesFailure, (state, action) => {
      return {
        ...state,
        articles: articleListInitialState.articles,
        loaded: false,
        loading: false,
        error : action.error
      };
    }),
    on(articleListActions.deleteArticle, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    
  ),
});
