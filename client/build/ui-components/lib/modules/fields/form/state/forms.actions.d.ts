import { FormState } from "../shared";
export declare const formsActions: import("@ngrx/store/src/action_group_creator_models").ActionGroup<"ngrxForms", {
    'Set Data': import("@ngrx/store").ActionCreatorProps<{
        data: any;
    }>;
    'Set Structure': import("@ngrx/store").ActionCreatorProps<{
        structure: any;
    }>;
    'Update Data': import("@ngrx/store").ActionCreatorProps<{
        state: FormState;
    }>;
    'Reset Form': import("@ngrx/store").ActionCreatorProps<void>;
    'Destroy Form': import("@ngrx/store").ActionCreatorProps<void>;
}>;
