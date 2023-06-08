import {createFeature, createReducer, on} from '@ngrx/store';
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {User} from "@shared/domain";
import {userActions} from "@users/+data-access/store/user/user.actions";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";

interface UserState {
  data: User | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const userInitialState: UserState = {
  data: null,
  loaded: false,
  loading: false,
  error: null,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    userInitialState,
    on(userActions.reset, () => userInitialState),
    on(userActions.loadUser, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(
      userActions.loadUserSuccess,
      (state, { user }) => {
        return {
          ...state,
          data : user,
          loaded: true,
          loading: false,
          error: null,
        };
      }
    ),
    on(userActions.loadUserFailure, (state, {error}) => {
      return {
        ...state,
        loaded: false,
        loading: false,
        error
      };
    }),
    on(userActions.editUserProfile, (state) => {
      return {
        ...state,
        loading: true,
        error : null
      };
    }),
    on(userActions.editUserProfileSuccess, (state) => {
      return {
        ...state,
        loading: false,
        error : null
      };
    }),
    on(userActions.editUserProfileFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error : action.error
      };
    }),
  ),
});
