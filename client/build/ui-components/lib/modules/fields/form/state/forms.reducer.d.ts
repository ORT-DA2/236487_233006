import { FormControlStatus } from '@angular/forms';
import { Field } from "../shared";
export interface NgrxFormsState {
    data: any;
    structure: Field[];
    valid: boolean;
    status: FormControlStatus;
    touched: boolean;
}
export declare const ngrxFormsInitialState: NgrxFormsState;
export declare const ngrxFormsFeature: import("@ngrx/store").FeatureConfig<"ngrxForms", NgrxFormsState> & import("@ngrx/store/src/feature_creator_models").FeatureSelector<Record<string, any>, "ngrxForms", NgrxFormsState> & {
    selectData: import("@ngrx/store").MemoizedSelector<Record<string, any>, any, import("@ngrx/store").DefaultProjectorFn<any>>;
    selectStatus: import("@ngrx/store").MemoizedSelector<Record<string, any>, FormControlStatus, import("@ngrx/store").DefaultProjectorFn<FormControlStatus>>;
    selectValid: import("@ngrx/store").MemoizedSelector<Record<string, any>, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
    selectTouched: import("@ngrx/store").MemoizedSelector<Record<string, any>, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
    selectStructure: import("@ngrx/store").MemoizedSelector<Record<string, any>, Field[], import("@ngrx/store").DefaultProjectorFn<Field[]>>;
};
