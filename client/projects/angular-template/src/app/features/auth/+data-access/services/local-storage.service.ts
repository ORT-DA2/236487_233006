import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthData} from "@auth/utils/types/login";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  
  getUser(): Observable<AuthData | null> {
    const user = localStorage.getItem('user');
    return of(user ? JSON.parse(user) : null);
  }

  // Saves user in local Storage
  setUser(user: AuthData): Observable<AuthData> {
    localStorage.setItem('user', JSON.stringify(user));
    return of(user);
  }

  removeUser(): Observable<boolean> {
    localStorage.removeItem('user');
    return of(true);
  }
}
