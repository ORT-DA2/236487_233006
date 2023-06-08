import {createFeature, createReducer, on} from '@ngrx/store';
import {FormControlStatus} from '@angular/forms';
import {Field} from "../shared";
import {formsActions} from "./forms.actions";

export interface NgrxFormsState {
  data: any;
  structure: Field[];
  valid: boolean;
  status : FormControlStatus;
  touched: boolean;
}

export const ngrxFormsInitialState: NgrxFormsState = {
  data: {},
  valid: true,
  status : 'VALID',
  touched: false,
  structure: [],
};

export const ngrxFormsFeature = createFeature({
  name: 'ngrxForms',
  reducer: createReducer(
    ngrxFormsInitialState,
    on(formsActions.setData, (state, action) => ({ ...state, data: action.data })),
    on(formsActions.updateData, (state, action) => {
      const data = { ...state.data, ...action.state.data };
      return {
        ...state,
        data,
        valid : action.state.valid,
        status : action.state.status,
        touched: true
      };
    }),
    on(formsActions.setStructure, (state, action) => ({ ...state, structure: action.structure })),
    on(formsActions.destroyForm, () => ngrxFormsInitialState),
    on(formsActions.resetForm, (state) => ({
      ...state,
      data : {},
      status : 'INVALID',
      valid : true,
      touched: false,
    })),
  ),
});
