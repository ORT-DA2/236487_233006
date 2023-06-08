import { createFeature, createReducer, on } from '@ngrx/store';
import * as ErrorHandlerActions from './error-handler.actions';

export interface ErrorHandlerState {
  code: number;
  message: string | undefined;
}

export const errorHandlerInitialState: ErrorHandlerState = {
  message: undefined,
  code: -1,
};

export const errorHandlerFeature = createFeature({
  name: 'errorHandler',
  reducer: createReducer(
    errorHandlerInitialState,
    on(ErrorHandlerActions.throw403Error, ErrorHandlerActions.throw401Error, ErrorHandlerActions.throw404Error, (state, action) => ({
      code: action.error.status,
      message: action.error.message,
    })),
  ),
});
