import {Injectable} from '@angular/core';
import {ApiService} from '@core';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {User} from "@shared/domain";

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {

  constructor(private apiService: ApiService) {
  }


  checkUsername(username: string): Observable<User[]> {
    let params = new HttpParams().set('username', username);

    return this.apiService.get<User[]>('/users', params);
  }

  checkEmail(email: string): Observable<User[]> {
    let params = new HttpParams().set('email', email);

    return this.apiService.get<User[]>('/users', params);
  }
}
