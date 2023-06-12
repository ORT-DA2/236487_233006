import {offensiveWordsFeature} from "@users/+data-access/store/offensive-words/offensive-words.reducers";

const {
  selectEntities,
  selectLoaded,
  selectLoading,
  selectError
} = offensiveWordsFeature

export const wordsQuery = {
  selectEntities,
  selectLoaded,
  selectLoading,
  selectError
};
