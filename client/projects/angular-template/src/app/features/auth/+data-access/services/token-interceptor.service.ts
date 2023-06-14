import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {switchMap} from "rxjs/operators";


export const tokenInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return inject(LocalStorageService)
    .getUser()
    .pipe(
      switchMap((user) => {
        if (user) {
          request = request.clone({
            setHeaders: {
              Authorization: user.token,
            },
          });
        }
        return next(request);
      })
    );
};
