export interface ErrorHandlerState {
    code: number;
    message: string | undefined;
}
export declare const errorHandlerInitialState: ErrorHandlerState;
export declare const errorHandlerFeature: import("@ngrx/store").FeatureConfig<"errorHandler", ErrorHandlerState> & import("@ngrx/store/src/feature_creator_models").FeatureSelector<Record<string, any>, "errorHandler", ErrorHandlerState> & {
    selectCode: import("@ngrx/store").MemoizedSelector<Record<string, any>, number, import("@ngrx/store").DefaultProjectorFn<number>>;
    selectMessage: import("@ngrx/store").MemoizedSelector<Record<string, any>, string | undefined, import("@ngrx/store").DefaultProjectorFn<string | undefined>>;
};
