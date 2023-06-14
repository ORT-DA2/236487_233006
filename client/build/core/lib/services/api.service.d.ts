import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';
import * as i0 from "@angular/core";
export declare class ApiService {
    private http;
    private appConfigService;
    constructor(http: HttpClient, appConfigService: AppConfigService);
    get<T>(url: string, params?: HttpParams): Observable<T>;
    post<T, D>(url: string, data?: D): Observable<T>;
    put<T, D>(url: string, data: D): Observable<T>;
    delete<T>(url: string): Observable<T>;
    get headers(): HttpHeaders;
    get api(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ApiService>;
}
