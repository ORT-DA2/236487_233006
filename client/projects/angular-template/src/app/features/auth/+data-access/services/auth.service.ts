import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService, RoleType} from '@core';
import {AuthData, OptionID, LoginFormModel} from "@auth/utils/types/login";
import {User} from "@shared/domain";

interface LoginCredentials {
  username?: string
  email?: string
  password: string
}

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  roles: RoleType[]
}

interface NewUser {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiService: ApiService) {}


  login(loginForm: LoginFormModel): Observable<AuthData> {
    let login : LoginCredentials = this.mapCredentials(loginForm)
    
    return this.apiService.post<AuthData, LoginCredentials>('/sessions',  login )
  }

  register(newUser: NewUser): Observable<User> {
    const body: RegisterRequest = { ...newUser, roles: [RoleType.Blogger] };
    return this.apiService.post<User, RegisterRequest>('/users', body );
  }
  
  logout(): Observable<void> {
    return this.apiService.delete<void>('/sessions');
  }
  
  
  private mapCredentials(loginForm: LoginFormModel): LoginCredentials {
    let credentials: LoginCredentials = {
      password: loginForm.password
    };
    
    if (loginForm.option === OptionID.EMAIL) credentials.email = loginForm.id;
    else credentials.username = loginForm.id;
    
    return credentials;
  }
}
