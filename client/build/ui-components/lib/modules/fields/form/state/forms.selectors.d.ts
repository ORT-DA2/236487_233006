export declare const ngrxFormsQuery: {
    selectNgrxFormsState: import("@ngrx/store").MemoizedSelector<Record<string, any>, import("./forms.reducer").NgrxFormsState, import("@ngrx/store").DefaultProjectorFn<import("./forms.reducer").NgrxFormsState>>;
    selectData: import("@ngrx/store").MemoizedSelector<Record<string, any>, any, import("@ngrx/store").DefaultProjectorFn<any>>;
    selectStructure: import("@ngrx/store").MemoizedSelector<Record<string, any>, import("ui-components").Field[], import("@ngrx/store").DefaultProjectorFn<import("ui-components").Field[]>>;
    selectTouched: import("@ngrx/store").MemoizedSelector<Record<string, any>, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
    selectValid: import("@ngrx/store").MemoizedSelector<Record<string, any>, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
};
