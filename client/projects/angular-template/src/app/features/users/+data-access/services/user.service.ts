import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService, RoleType} from "@core";
import {map} from "rxjs/operators";
import {IOption} from "@ui-components";
import {UserFormModel} from "@users/utils/types/user";
import {Article, User} from "@shared/domain";


interface NewUserDTO {
  email: string;
  password : string;
  username: string;
  firstName: string;
  lastName: string
  roles : RoleType[]
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private api: ApiService) {
  }
  
  getAll(): Observable<User[]> {
    return this.api.get<User[]>('/users')
  }
  
  getMyArticles(): Observable<Article[]> {
    return this.api.get<Article[]>('/articles');
  }
  
  getSpecificUser(userId : number): Observable<User> {
    return this.api.get<User>('/users/' + userId);
  }
  
  delete(userId: number): Observable<void> {
    return this.api.delete<void>('/users/' + userId);
  }
  
  createNewUser(user: UserFormModel): Observable<User> {
    return this.api.post<User, NewUserDTO>('/users/',  this.toNewUserDTO(user));
  }
  
  editUser(user: UserFormModel): Observable<User>{
    return this.api.put<User, User>('/users/' + user.id, this.toUserDTO(user));
  }
  
  
  private toUserDTO(user: UserFormModel): User {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: Array.isArray(user.roles) ?  user.roles : [user.roles]
    };
  }
  
  private toNewUserDTO(user: UserFormModel): NewUserDTO {
    return {
      email: user.email,
      password: user.password,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: [user.roles]
    };
  }
}
