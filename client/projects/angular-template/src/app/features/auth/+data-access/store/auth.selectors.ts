import {authFeature} from './auth.reducer';
import {createSelector} from '@ngrx/store';
import {User} from "@shared/domain";

const { selectLoggedIn,  selectLoading, selectError, selectRegisterError } = authFeature;


const selectAuthState = authFeature.selectAuthState;

const selectLoginFormState = createSelector(
  selectAuthState,
  (state) => state.loginForm
);


const selectLoginData = createSelector(
  selectLoginFormState,
  (state) => state.data
);

const selectLoginStructure = createSelector(
  selectLoginFormState,
  (state) => state.structure
);

const selectLoginValidity = createSelector(
  selectLoginFormState,
  (state) => state.valid
);

const selectLoggedUser = createSelector(
  selectAuthState,
  (state) => state.data?.user as User || null
);

const selectToken = createSelector(
  selectAuthState,
  (state) => state.data?.token as string
);

export const authQuery = {
  selectAuthState,
  selectLoggedIn,
  selectLoading,
  selectLoggedUser,
  selectRegisterError,
  selectLoginData,
  selectLoginStructure,
  selectLoginValidity,
  selectError,
  selectToken
};
