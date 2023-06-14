import {RoleType} from "@core";

export function isAdmin(roles : RoleType[]){
	return roles.every(role => roles.includes(RoleType.Admin));
}
