import {userListFeature} from "@users/+data-access/store/user-list/user-list.reducers";

const {
  selectUserListState,
  selectLoaded,
  selectLoading,
  selectUsers,
  selectError,
  selectDialogError
} = userListFeature;

export const userListQuery = {
  selectUserListState,
  selectLoaded,
  selectLoading,
  selectUsers,
  selectError,
  selectDialogError
};
