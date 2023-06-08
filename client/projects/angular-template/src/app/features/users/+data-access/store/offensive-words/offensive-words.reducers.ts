import {createFeature, createReducer, on} from '@ngrx/store';
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {OffensiveWord, User} from "@shared/domain";
import {wordsActions} from "@users/+data-access/store/offensive-words/offensive-words.actions";

export interface OffensiveWordstState {
  words: Array<OffensiveWord>;
  loaded: boolean;
  loading: boolean;
  error : string | null
}

export const offensiveWordsInitialState: OffensiveWordstState = {
  words: [],
  loaded: false,
  loading: false,
  error : null,
};

export const offensiveWordsFeature = createFeature({
  name: 'offensiveWords',
  reducer: createReducer(
    offensiveWordsInitialState,
    on(wordsActions.reset, () => offensiveWordsInitialState),
    on(wordsActions.loadWords, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(wordsActions.loadWordsSuccess, (state, {words} ) => {
      return {
        ...state,
        words : words,
        loaded: true,
        loading: false,
        error : null
      };
    }),
    on(wordsActions.loadWordsFailure, (state, action) => {
      return {
        ...state,
        words: [],
        loaded: false,
        loading: false,
        error : action.error
      };
    }),
    on(wordsActions.deleteWord, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(wordsActions.createWord, (state) => {
      return {
        ...state,
        loading: true,
        error : null
      };
    }),
    on(wordsActions.createWordFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error : action.error
      };
    }),
  ),
});
