import {FormControl, FormGroup} from "@angular/forms";
import {RoleType} from "@core";
import {User} from "@shared/domain";

export interface UserForm extends FormGroup {
	controls: {
		firstName: FormControl<string>
		lastName: FormControl<string>
		email: FormControl<string>
		username: FormControl<string>
		password: FormControl<string>
		roles: FormControl<RoleType>
	}
}

export interface UserFormModel {
	firstName: string
	lastName: string
	email: string
	username: string
	password: string
	roles : RoleType;
	id : number;
}

export interface UserVM{
	data : User | null;
	loading : boolean
	error : string | null
}
