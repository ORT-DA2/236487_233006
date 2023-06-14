import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare const errorHandlingInterceptor: (request: HttpRequest<any>, next: HttpHandlerFn) => Observable<HttpEvent<any>>;
