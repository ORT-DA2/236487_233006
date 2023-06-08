import { ngrxFormsFeature } from './forms.reducer';

const { selectNgrxFormsState, selectData, selectStructure, selectTouched, selectValid } =
  ngrxFormsFeature;

export const ngrxFormsQuery = {
  selectNgrxFormsState,
  selectData,
  selectStructure,
  selectTouched,
  selectValid,
};
