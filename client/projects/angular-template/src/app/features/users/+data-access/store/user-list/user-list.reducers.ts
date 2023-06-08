import {createFeature, createReducer, on} from '@ngrx/store';
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {User} from "@shared/domain";

export interface UserListState {
  users: Array<User>;
  loaded: boolean;
  loading: boolean;
  error : string | null
  dialogError : string | null
}

export const userListInitialState: UserListState = {
  users: [],
  loaded: false,
  loading: false,
  error : null,
  dialogError: null
};

export const userListFeature = createFeature({
  name: 'userList',
  reducer: createReducer(
    userListInitialState,
    on(userListActions.reset, () => userListInitialState),
    on(userListActions.loadUsers, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(userListActions.loadUsersSuccess, (state, {users} ) => {
      return {
        ...state,
        users : users,
        loaded: true,
        loading: false,
        error : null
      };
    }),
    on(userListActions.loadUsersFailure, (state, action) => {
      return {
        ...state,
        users: [],
        loaded: false,
        loading: false,
        error : action.error
      };
    }),
    on(articleListActions.deleteArticle, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(userListActions.editUser, (state) => {
      return {
        ...state,
        loading: true,
        dialogError : null
      };
    }),
    on(userListActions.editUserFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        dialogError : action.error
      };
    }),
    on(userListActions.createNewUser, (state) => {
      return {
        ...state,
        loading: true,
        dialogError : null
      };
    }),
    on(userListActions.createNewUserFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        dialogError : action.error
      };
    }),
  ),
});
