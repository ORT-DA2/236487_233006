import {createFeature, createReducer, on} from '@ngrx/store';
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {Article} from "@shared/domain";
import {EntityState} from "@core";

interface ArticleState extends EntityState<Article> {
  openedReplyBox : number | null
}

export const articleInitialState: ArticleState = {
  data: null,
  loaded: false,
  loading: false,
  error: null,
  openedReplyBox : null
};

export const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer<ArticleState>(
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
    on(articleActions.addComment, articleActions.addReply, articleActions.approveArticle, articleActions.rejectArticle, articleActions.approveArticleComment, articleActions.rejectArticleComment, (state) => ({
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
    })),
    
    on(articleActions.openReplyBox, (state, {commentId}) => ({
      ...state,
      openedReplyBox : commentId
    })),
    on(articleActions.closeReplyBox, (state) => ({
      ...state,
      openedReplyBox : null
    }))
  ),
});
