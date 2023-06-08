import {createFeature, createReducer, on} from '@ngrx/store';
import {authActions} from './auth.actions';
import {FormControlStatus} from '@angular/forms';
import {Field, FormStatus} from '@ui-components';
import {AuthData, LoginFormModel} from "@auth/utils/types/login";

interface AuthState {
  loginForm : LoginFormState
  data: AuthData | null;
  loggedIn: boolean;
  loading : boolean;
  error : string | null
  registerError : string | null
}

interface LoginFormState {
  data:  LoginFormModel | null ;
  valid: boolean;
  status: FormControlStatus;
  structure: Field[];
}

export const authInitialState: AuthState = {
  loggedIn: false,
  loading : false,
  data : null,
  error : null,
  registerError : null,
  loginForm: {
    data: null,
    valid: false,
    status: FormStatus.VALID,
    structure: [],
  },
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    authInitialState,
    on(authActions.setLoggedUser, (state, { data }) => {
      return { ...state, data, loggedIn: true };
    }),
    on(authActions.updateLoggedUser, (state, {user}) => {
      return {
        ...state,
        data : {
          token : state?.data?.token || "",
          user
        }
      };
    }),
    
    
    on(authActions.logout, () => authInitialState),
    
    on(authActions.login, (state) => ({
      ...state,
      loading : true,
      error : null
    })),
    on(authActions.loginSuccess, (state, {data}) => ({
      ...state,
      loggedIn: true,
      loading: false,
      data,
      error : null,
    })),
    on(authActions.loginFailure, (state, {error}) => {
      return {
        ...state,
        loading: false,
        error: error,
        data : null,
      }
    }),
  
    on(authActions.register, (state) => ({
      ...state,
      loading : true,
      registerError : null
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      loading: false,
      registerError : null
    })),
    on(authActions.registerFailure, (state, {error}) => {
      return {
        ...state,
        loading: false,
        registerError : error
      }
    }),
    on(authActions.resetRegister, (state) => {
      return {
        ...state,
        loading: false,
        registerError : null
      }
    }),

    on(authActions.setLoginData, (state, action) => ({
      ...state,
      loginForm: {
        ...state.loginForm,
        data: action.data
      }
    })),
    on(authActions.updateLoginData, (state, action) => {
      // ...(state.loginForm.data || {})  // Here i check if data is null
      const data = { ...(state.loginForm.data || {}), ...action.state.data };
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          data,
          valid: action.state.valid,
          status: action.state.status,
        }
      };
    }),
    on(authActions.setLoginStructure, (state, action) => ({
      ...state,
      loginForm: {
        ...state.loginForm,
        structure: action.structure
      }
    })),
    on(authActions.resetLoginForm, (state) => ({
      ...state,
      loginForm: {
        ...state.loginForm,
        touched: false
      }
    }))

  ),
});


// export const  {name : authFeatureKey , reducer : authReducer} = authFeature
