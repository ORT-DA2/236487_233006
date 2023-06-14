import {commentListFeature} from "@articles/+data-access/store/comment-list/comment-list.reducers";

const {
  selectEntities,
  selectLoaded,
  selectLoading,
  selectError,
  selectOpenedReplyBox
} = commentListFeature;

export const commentListQuery = {
  selectEntities,
  selectLoaded,
  selectLoading,
  selectError,
  selectOpenedReplyBox
};
