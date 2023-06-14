import {userFeature} from "@users/+data-access/store/user/user.reducers";

const {
  selectData,
  selectLoaded,
  selectLoading,
  selectError,
} = userFeature;

export const userQuery = {
  selectData,
  selectLoaded,
  selectLoading,
  selectError,
};
