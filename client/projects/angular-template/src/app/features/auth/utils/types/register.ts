import {FormControl, FormGroup} from '@angular/forms'


export interface RegisterForm extends FormGroup {
  controls: {
    firstName: FormControl<string>
    lastName: FormControl<string>
    email: FormControl<string>
    username: FormControl<string>
    password: FormControl<string>
    passwordConfirmation: FormControl<string>
  }
}

export interface RegisterFormModel{
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  passwordConfirmation: string
}

