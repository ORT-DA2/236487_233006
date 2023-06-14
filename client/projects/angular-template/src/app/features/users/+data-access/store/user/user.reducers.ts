import {createFeature, createReducer, on} from '@ngrx/store';
import {User} from "@shared/domain";
import {userActions} from "@users/+data-access/store/user/user.actions";
import {EntityState} from "@core";

interface UserState extends EntityState<User> {}

export const userInitialState: UserState = {
  data: null,
  loaded: false,
  loading: false,
  error: null,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer<UserState>(
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
