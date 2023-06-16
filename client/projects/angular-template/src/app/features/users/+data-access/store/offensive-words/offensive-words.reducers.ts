import {createFeature, createReducer, on} from '@ngrx/store';
import {OffensiveWord} from "@shared/domain";
import {wordsActions} from "@users/+data-access/store/offensive-words/offensive-words.actions";
import {EntityListState} from "@core";

interface OffensiveWordsState extends EntityListState<OffensiveWord> {}

export interface OffensiveWordsVM {
  entities: OffensiveWord[]
  loading: boolean
  error : string | null
}

export const offensiveWordsInitialState: OffensiveWordsState = {
  entities: [],
  loaded: false,
  loading: false,
  error : null,
};

export const offensiveWordsFeature = createFeature({
  name: 'offensiveWords',
  reducer: createReducer<OffensiveWordsState>(
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
        entities : words,
        loaded: true,
        loading: false,
        error : null
      };
    }),
    on(wordsActions.loadWordsFailure, (state, action) => {
      return {
        ...state,
        entities: [],
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
