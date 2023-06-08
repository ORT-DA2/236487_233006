import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserFormModel} from "@users/utils/types/user";
import {User} from "@shared/domain";


export const userListActions = createActionGroup({
	source: 'User List',
	events: {
		'Reset' : emptyProps(),
		
		'Load Users': emptyProps(),
		'Load Users Success': props<{ users: User[] }>(),
		'Load Users Failure': props<{ error: string }>(),
		
		'Create New User' : props<{ user: UserFormModel}>(),
		'Create New User Success': props<{ user: User}>(),
		'Create New User Failure': props<{ error: string }>(),
		
		'Edit User' : props<{ user: UserFormModel}>(),
		'Edit User Success': props<{ user: User}>(),
		'Edit User Failure': props<{ error: string }>(),
		
		'Delete User' : props<{ userId: number }>(),
	},
});
