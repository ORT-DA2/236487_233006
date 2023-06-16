// Here im using destructuring to create new private objects from our generalFeature declared
// on reducers file.
import {articleListFeature} from "@articles/+data-access/store/article-list/article-list.reducers";

const {
  selectArticleListState,
  selectEntities,
  selectLoaded,
  selectLoading,
  selectError,
  selectEditing,
} = articleListFeature;

// This object will represent the public interface of the selectors, this improves when we try to
// import the selectors file, since we are only going to need to import the generalQuery object.
export const articleListQuery = {
  selectArticleListState,
  selectEntities,
  selectLoaded,
  selectLoading,
  selectError,
  selectEditing,
};
