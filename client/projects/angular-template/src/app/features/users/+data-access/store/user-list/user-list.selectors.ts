import {userListFeature} from "@users/+data-access/store/user-list/user-list.reducers";

const {
  selectUserListState,
  selectLoaded,
  selectLoading,
  selectEntities,
  selectError,
  selectDialogError
} = userListFeature;

export const userListQuery = {
  selectUserListState,
  selectLoaded,
  selectLoading,
  selectEntities,
  selectError,
  selectDialogError
};
