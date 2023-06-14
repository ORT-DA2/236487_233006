import {createFeature, createReducer, on} from '@ngrx/store';
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {User} from "@shared/domain";
import {EntityListState} from "@core";

interface UserListState extends EntityListState<User> {
  dialogError: string | null;
}

export const userListInitialState: UserListState = {
  entities: [],
  loaded: false,
  loading: false,
  error : null,
  dialogError: null
};

export const userListFeature = createFeature({
  name: 'userList',
  reducer: createReducer<UserListState>(
    userListInitialState,
    on(userListActions.reset, () => userListInitialState),
    on(userListActions.loadUsers, userListActions.loadUsersRanking, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    on(userListActions.loadUsersSuccess, (state, {users} ) => {
      return {
        ...state,
        entities : users,
        loaded: true,
        loading: false,
        error : null
      };
    }),
    on(userListActions.loadUsersFailure, (state, action) => {
      return {
        ...state,
        entities: [],
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
