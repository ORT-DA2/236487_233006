import {createFeature, createReducer, on} from '@ngrx/store';
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {Article} from "@shared/domain";

interface ArticleState {
  data: Article | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const articleInitialState: ArticleState = {
  data: null,
  loaded: false,
  loading: false,
  error: null,
};

export const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    articleInitialState,
    on(articleActions.reset, () => articleInitialState),
    on(articleActions.loadArticle, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(articleActions.loadArticleSuccess,
      (state, action) => {
        return {
          ...state,
          data : action.article,
          loaded: true,
          loading: false,
          error: null,
        };
      }
    ),
    on(articleActions.loadArticleFailure, (state, {error}) => {
      return {
        ...state,
        loaded: false,
        loading: false,
        error
      };
    }),
    on(articleActions.addComment, articleActions.addReply, (state) => ({
      ...state,
      loading: true
    })),
    on(articleActions.addCommentSuccess, articleActions.addReplySuccess, (state) => ({
      ...state,
      loading: false
    })),
    on(articleActions.addCommentFailure, articleActions.addReplyFailure, (state) => ({
      ...state,
      loading: false
    }))
  ),
});
