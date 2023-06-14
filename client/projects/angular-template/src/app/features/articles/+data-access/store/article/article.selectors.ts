// Here im using destructuring to create new private objects from our generalFeature declared
// on reducers file.
import {articleFeature} from "@articles/+data-access/store/article/article.reducers";
import {createSelector} from "@ngrx/store";

const {
  selectArticleState,
  selectData,
  selectLoaded,
  selectLoading,
  selectError,
  selectOpenedReplyBox
} = articleFeature;

export const selectAuthorId = createSelector(selectData, (data) => data?.authorId);


// This object will represent the public interface of the selectors, this improves when we try to
// import the selectors file, since we are only going to need to import the generalQuery object.
export const articleQuery = {
  selectArticleState,
  selectData,
  selectLoaded,
  selectLoading,
  selectError,
  selectOpenedReplyBox
};
