import { REGEX as REGEX$1, InitialDialogState as InitialDialogState$1 } from '@core';
import * as i0 from '@angular/core';
import { Pipe, Injectable, inject } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { createAction, props, createFeature, createReducer, on, Store } from '@ngrx/store';
import { tap, catchError } from 'rxjs/operators';
import * as i1$1 from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import * as i2 from '@angular/router';
import * as i3 from 'ngx-toastr';

const PAGES = {
// LOGIN: '/login',   <= Example
};
const REGEX = {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    ALPHANUMERIC: /^[a-zA-Z0-9]*$/,
    NO_WHITESPACE: /^\S*$/
};
const ASSETS = {
// LOGO_COLOR: 'assets/svg/logo-color.svg',   <= Example
};
var DialogType;
(function (DialogType) {
    DialogType["User"] = "user";
    DialogType["Delete"] = "delete";
    DialogType["Register"] = "register";
    DialogType["AdminNotification"] = "adminNotification";
})(DialogType || (DialogType = {}));
const InitialDialogState = {
    [DialogType.Register]: false,
    [DialogType.User]: false,
    [DialogType.Delete]: false,
    [DialogType.AdminNotification]: false,
    // ... other initial dialog states
};
var RoleType;
(function (RoleType) {
    RoleType[RoleType["Admin"] = 1] = "Admin";
    RoleType[RoleType["Blogger"] = 2] = "Blogger";
})(RoleType || (RoleType = {}));
var ImagePosition;
(function (ImagePosition) {
    ImagePosition[ImagePosition["Top"] = 0] = "Top";
    ImagePosition[ImagePosition["Left"] = 1] = "Left";
    ImagePosition[ImagePosition["Bottom"] = 2] = "Bottom";
    ImagePosition[ImagePosition["TopAndBottom"] = 3] = "TopAndBottom";
})(ImagePosition || (ImagePosition = {}));
var FilterFrom;
(function (FilterFrom) {
    FilterFrom["AllArticles"] = "articles";
    FilterFrom["Recent"] = "recent";
})(FilterFrom || (FilterFrom = {}));

function appConfig(app) {
    return () => app.loadConfig();
}

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
function ValidateEmail(control) {
    const value = control.value;
    if (!value)
        return null;
    const emailregex = EMAIL_REGEX;
    if (emailregex.test(value))
        return null;
    else
        return { emailPattern: true };
}

function validationIdDigit(ci) {
    let a = 0;
    if (ci.length <= 6) {
        for (let i = ci.length; i < 7; i++) {
            ci = '0' + ci;
        }
    }
    for (let i = 0; i < 7; i++) {
        a += (parseInt('2987634'[i], 10) * parseInt(ci[i], 10)) % 10;
    }
    if (a % 10 === 0)
        return 0;
    else
        return 10 - (a % 10);
}
function ValidateIdNumber(control) {
    if (control.value) {
        let ci = control.value;
        const dig = ci[ci.length - 1];
        if (ci === '')
            return { required: true };
        else if (ci.length !== 8 ||
            dig != validationIdDigit(ci.replace(/[0-9]$/, '')))
            return { invalid: true };
        return null;
    }
    else {
        return null;
    }
}

function ValidatePhoneNumber(control) {
    const reg = control.value.toString();
    if (reg === '')
        return null;
    const cellphone = /^0(91|92|93|94|95|96|97|98|99)[0-9]{6}$/;
    const phoneRest = /^4(2|33|47|45|64|62|77|73|72|56|54|52|34|35|44|36|63)[0-9]{5,6}$/;
    const phoneMontevideo = /^2[0-9]{7}$/;
    if (reg.match(cellphone) || reg.match(phoneRest) || reg.match(phoneMontevideo))
        return null;
    else
        return { invalid: true };
}

function removeSpaces(control) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
        control.setValue('');
    }
    return null;
}

function rutValidationDigit(rut) {
    let count = 0;
    const data = '43298765432';
    data.split('').forEach((dig, i) => {
        count += parseInt(dig) * parseInt(rut[i]);
    });
    const result = count % 11;
    if (result === 0)
        return 0;
    else
        return (11 - result);
}
function ValidateRUT(control) {
    const rut = control.value || '';
    const value = rut;
    // if (rut === '') return { required: true };
    if (rut === '')
        return null;
    const dig = value[value.length - 1];
    if (value === '' || value.length !== 12 || dig != rutValidationDigit(value))
        return { invalid: true };
    return null;
}

// Whenever the user uploads a file, we return a true (invalid)
// value if its extension is not the same as the one we defined in
// the validator.
function requiredFileType(requiredType) {
    return function (control) {
        const extension = control.value.type;
        if (extension !== requiredType) {
            return { requiredFileType: true };
        }
        return null;
    };
}

function ValidateNoWhitespace(control) {
    const value = control.value;
    if (!value)
        return null;
    if (value.match(REGEX$1.NO_WHITESPACE))
        return null;
    else
        return { whitespacePattern: true };
}

function ValidateAlphanumeric(control) {
    const value = control.value;
    if (!value)
        return null;
    if (value.match(REGEX$1.ALPHANUMERIC))
        return null;
    else
        return { alphanumericPattern: true };
}

class TruncatePipe {
    transform(value, limit = 25, completeWords = false, ellipsis = '...') {
        if (completeWords) {
            limit = value.substr(0, limit).lastIndexOf(' ');
        }
        return `${value.substr(0, limit)}${ellipsis}`;
    }
}
TruncatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TruncatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, isStandalone: true, name: "truncate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'truncate',
                    standalone: true
                }]
        }] });

const DIALOG_ACTION = {
    EDIT: 'edit',
    DELETE: 'delete'
};

class AppConfigService {
    constructor(_handler) {
        this._handler = _handler;
    }
    get dotEnv() {
        return this._dotEnv;
    }
    // Método para cargar el archivo de configuración
    loadConfig() {
        const http = new HttpClient(this._handler);
        return http
            .get('/assets/.env')
            .toPromise()
            .then((response) => {
            if (response)
                this._dotEnv = response;
        });
    }
}
AppConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppConfigService, deps: [{ token: i1.HttpBackend }], target: i0.ɵɵFactoryTarget.Injectable });
AppConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpBackend }]; } });

class ApiService {
    constructor(http, appConfigService) {
        this.http = http;
        this.appConfigService = appConfigService;
    }
    get(url, params = new HttpParams()) {
        return this.http.get(`${this.api}${url}`, {
            headers: this.headers,
            params,
        });
    }
    post(url, data) {
        return this.http.post(`${this.api}${url}`, JSON.stringify(data), {
            headers: this.headers,
        });
    }
    put(url, data) {
        return this.http.put(`${this.api}${url}`, JSON.stringify(data), {
            headers: this.headers,
        });
    }
    delete(url) {
        return this.http.delete(`${this.api}${url}`, {
            headers: this.headers,
        });
    }
    get headers() {
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        return new HttpHeaders(headersConfig);
    }
    get api() {
        return this.appConfigService.dotEnv.api;
    }
}
ApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ApiService, deps: [{ token: i1.HttpClient }, { token: AppConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
ApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ApiService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: AppConfigService }]; } });

class DialogService {
    constructor() {
        this.dialogStateTracker$ = new BehaviorSubject(InitialDialogState$1);
        this.payloadState$ = new BehaviorSubject(null);
        this.dialog$ = this.dialogStateTracker$.asObservable();
        this.payload$ = this.payloadState$.asObservable();
    }
    openDialog(dialogType, payload = null) {
        this.payloadState$.next(payload);
        this.dialogStateTracker$.next({ ...this.dialogStateTracker$.value, [dialogType]: true });
    }
    closeDialog(dialogType) {
        this.payloadState$.next(null);
        this.dialogStateTracker$.next({ ...this.dialogStateTracker$.value, [dialogType]: false });
    }
    get data() {
        return this.payloadState$.value?.data;
    }
    get payload() {
        return this.payloadState$.value;
    }
}
DialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const throw401Error = createAction('[ngrx-error] THROW_401_ERROR', props());
const throw403Error = createAction('[ngrx-error] THROW_403_ERROR', props());
const throw404Error = createAction('[ngrx-error] THROW_404_ERROR', props());

class ErrorHandlerEffects {
    constructor(actions$, router, toast) {
        this.actions$ = actions$;
        this.router = router;
        this.toast = toast;
        this.on401$ = createEffect(() => this.actions$.pipe(ofType(throw401Error), tap(({ error }) => this.toast.error(error.error, "Not Authorized")), tap(() => this.router.navigate(['/private/articles']))), { dispatch: false });
        this.on403$ = createEffect(() => this.actions$.pipe(ofType(throw403Error), tap(() => this.router.navigate(['/access-denied']))), { dispatch: false });
        this.on404$ = createEffect(() => this.actions$.pipe(ofType(throw404Error), tap(() => this.router.navigate(['/not-found']))), { dispatch: false });
    }
}
ErrorHandlerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ErrorHandlerEffects, deps: [{ token: i1$1.Actions }, { token: i2.Router }, { token: i3.ToastrService }], target: i0.ɵɵFactoryTarget.Injectable });
ErrorHandlerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ErrorHandlerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ErrorHandlerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: i2.Router }, { type: i3.ToastrService }]; } });

const errorHandlerInitialState = {
    message: undefined,
    code: -1,
};
const errorHandlerFeature = createFeature({
    name: 'errorHandler',
    reducer: createReducer(errorHandlerInitialState, on(throw403Error, throw401Error, throw404Error, (state, action) => ({
        code: action.error.status,
        message: action.error.message,
    }))),
});

const errorHandlingInterceptor = (request, next) => {
    const store = inject(Store);
    return next(request).pipe(catchError((error) => {
        if (error instanceof HttpErrorResponse) {
            switch (error.status) {
                case 401:
                    store.dispatch(throw401Error({ error }));
                    break;
                case 403:
                    store.dispatch(throw403Error({ error }));
                    break;
                case 404:
                    store.dispatch(throw404Error({ error }));
                    break;
                case 0:
                    console.log("ooOps something went wrong");
                    break;
                default:
                    throwError(error);
                    break;
            }
        }
        return throwError(error);
    }));
};

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ASSETS, ApiService, AppConfigService, DIALOG_ACTION, DialogService, DialogType, EMAIL_REGEX, ErrorHandlerEffects, FilterFrom, ImagePosition, InitialDialogState, PAGES, REGEX, RoleType, TruncatePipe, ValidateAlphanumeric, ValidateEmail, ValidateIdNumber, ValidateNoWhitespace, ValidatePhoneNumber, ValidateRUT, appConfig, errorHandlerFeature, errorHandlerInitialState, errorHandlingInterceptor, removeSpaces, requiredFileType, throw401Error, throw403Error, throw404Error };
//# sourceMappingURL=core.mjs.map
