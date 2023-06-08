import {offensiveWordsFeature} from "@users/+data-access/store/offensive-words/offensive-words.reducers";

const {
  selectWords,
  selectLoaded,
  selectLoading,
  selectError
} = offensiveWordsFeature

export const wordsQuery = {
  selectWords,
  selectLoaded,
  selectLoading,
  selectError
};
