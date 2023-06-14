import { HttpErrorResponse } from '@angular/common/http';
export declare const throw401Error: import("@ngrx/store").ActionCreator<"[ngrx-error] THROW_401_ERROR", (props: {
    error: HttpErrorResponse;
}) => {
    error: HttpErrorResponse;
} & import("@ngrx/store/src/models").TypedAction<"[ngrx-error] THROW_401_ERROR">>;
export declare const throw403Error: import("@ngrx/store").ActionCreator<"[ngrx-error] THROW_403_ERROR", (props: {
    error: HttpErrorResponse;
}) => {
    error: HttpErrorResponse;
} & import("@ngrx/store/src/models").TypedAction<"[ngrx-error] THROW_403_ERROR">>;
export declare const throw404Error: import("@ngrx/store").ActionCreator<"[ngrx-error] THROW_404_ERROR", (props: {
    error: HttpErrorResponse;
}) => {
    error: HttpErrorResponse;
} & import("@ngrx/store/src/models").TypedAction<"[ngrx-error] THROW_404_ERROR">>;
