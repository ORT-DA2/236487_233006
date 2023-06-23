import {createFeature, createReducer, on} from '@ngrx/store';
import {FormControlStatus} from '@angular/forms';
import {Field} from "../shared";
import {formsActions} from "./forms.actions";
import {IOption} from "../../select-field/select-field.component";

export interface NgrxFormsState {
  data: any;
  structure: Field[];
  valid: boolean;
  status : FormControlStatus;
  touched: boolean;
  options : OptionsState[]
}

export interface OptionsState {
  key : string | null
  data : IOption[]
}

export const ngrxFormsInitialState: NgrxFormsState = {
  data: {},
  valid: true,
  status : 'VALID',
  touched: false,
  structure: [],
  options : []
};

export const ngrxFormsFeature = createFeature({
  name: 'ngrxForms',
  reducer: createReducer(
    ngrxFormsInitialState,
    on(formsActions.setData, (state, action) => ({ ...state, data: action.data })),
    on(formsActions.setOptions, (state, action) => {
      const optionsCopy = [...state.options]; // create a copy of the existing options
      const existingOptionIndex = optionsCopy.findIndex(option => option.key === action.key); // find index of existing option
    
      if (existingOptionIndex >= 0) {
        // If option with same key exists, replace it
        optionsCopy[existingOptionIndex] = {key: action.key, data: action.options};
      } else {
        // If option with same key does not exist, add new option
        optionsCopy.push({key: action.key, data: action.options});
      }
    
      return {
        ...state,
        options: optionsCopy
      };
    }),
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
    on(formsActions.setStructure, (state, action) => ({
      ...state,
      structure: action.structure
    })),
    on(formsActions.destroyForm, () => ngrxFormsInitialState),
    on(formsActions.resetForm, (state) => ({
      ...state,
      data : {},
      status : 'INVALID',
      valid : true,
      touched: false,
      options : []
    })),
  ),
});
