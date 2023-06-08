	import {RoleType} from "@core";

export interface User{
	id : number;
	email: string;
	password: string;
	username: string;
	firstName: string;
	lastName: string;
	roles : RoleType[]
}
