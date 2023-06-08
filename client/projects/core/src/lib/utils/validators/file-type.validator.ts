import {FormControl} from '@angular/forms';


// Whenever the user uploads a file, we return a true (invalid)
// value if its extension is not the same as the one we defined in
// the validator.
export function requiredFileType( requiredType: string ) {
  return function (control: FormControl) {
    const extension = control.value.type ;
    if ( extension !== requiredType ) {
        return { requiredFileType: true };
      }
      return null;
    }

}
