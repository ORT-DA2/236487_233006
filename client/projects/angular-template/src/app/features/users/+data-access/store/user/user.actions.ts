import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Article, User} from "@shared/domain";
import {UserFormModel} from "@users/utils/types/user";

export const userActions = createActionGroup({
  source: 'User',
  events: {
    reset: emptyProps(),
    'Load User': props<{ userId: number }>(),
    'Load User Success': props<{ user: User}>(),
    'Load User Failure': props<{ error: string }>(),
  
  
    'Edit User Profile' : props<{ user: UserFormModel}>(),
    'Edit User Profile Success': props<{ user: User}>(),
    'Edit User Profile Failure': props<{ error: string }>(),
  },
});
