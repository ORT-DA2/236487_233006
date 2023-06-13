import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Field, FormState} from '@ui-components';
import {RegisterFormModel} from "@auth/utils/types/register";
import {AuthData} from "@auth/utils/types/login";
import {User} from "@shared/domain";

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': emptyProps(),
    'Login Success': props<{ data: AuthData }>(),
    'Login Failure': props<{ error: string }>(),

    'Register': props<{newUser : RegisterFormModel}>(),
    'Register Success': emptyProps(),
    'Register Failure': props<{ error: string }>(),
    'Reset Register' : emptyProps(),

    'Logout': emptyProps(),

    // LoginForm specific actions start
    'Set Login Data': props<{ data: any }>(),
    'Set Login Structure': props<{ structure: Field[] }>(),
    'Update Login Data': props<{ state : FormState}>(),
    'Reset Login Form': emptyProps(),
    // Login specific actions end
  
    // On browser refresh, save LoggedUser on store
    'Set Logged User' :  props<{ data: AuthData }>(),
    'Update Logged User' : props<{ user: User }>(),
  },
});

