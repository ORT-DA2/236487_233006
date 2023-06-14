import {createFeature, createReducer, on} from '@ngrx/store';
import {EntityListState} from "@core";
import {commentListActions} from "@articles/+data-access/store/comment-list/comment-list.actions";
import {Comment} from "@shared/domain";

interface CommentListState extends EntityListState<Comment> {
  openedReplyBox : number | null
}

export const commentListInitialState: CommentListState = {
  entities: [],
  loaded: false,
  loading: false,
  error : null,
  openedReplyBox : null
};

export const commentListFeature = createFeature({
  name: 'commentList',
  reducer: createReducer<CommentListState>(
    commentListInitialState,
    on(commentListActions.reset, () => commentListInitialState),
    on(commentListActions.loadMyComments, commentListActions.loadOffensiveComments, (state) => {
      return {
        ...state,
        loading: true,
        editing: false,
      };
    }),
    on(commentListActions.loadCommentsSuccess, (state, {comments} ) => {
      return {
        ...state,
        entities: comments,
        loaded: true,
        loading: false,
        error : commentListInitialState.error
      };
    }),
    on(commentListActions.loadCommentsFailure, (state, action) => {
      return {
        ...state,
        entities: commentListInitialState.entities,
        loaded: false,
        loading: false,
        error : action.error
      };
    }),
    on(commentListActions.addReply, commentListActions.approveComment, commentListActions.rejectComment, (state) => ({
      ...state,
      loading: true,
      error : commentListInitialState.error
    })),
    on(commentListActions.addReplySuccess, (state) => ({
      ...state,
      loading: false,
      error : commentListInitialState.error
    })),
    on( commentListActions.addReplyFailure, (state, action) => ({
      ...state,
      loading: false,
      error : action.error
    })),
    on(commentListActions.openReplyBox, (state, {commentId}) => ({
      ...state,
      openedReplyBox : commentId
    })),
    on(commentListActions.closeReplyBox, (state) => ({
      ...state,
      openedReplyBox : null
    }))
    
  ),
});
