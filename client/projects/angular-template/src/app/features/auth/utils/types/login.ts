import {FormControl, FormGroup} from '@angular/forms'
import {User} from "@shared/domain";


// AuthData is what server responds upon login action
// This is what I save on localStorage and have as reference on store
export interface AuthData {
  token : string
  user : User
}

export interface LoginForm extends FormGroup {
  controls: {
    option: FormControl<number>
    id: FormControl<string>
    password: FormControl<string>
  }
}

export interface LoginFormModel {
  option: number
  id: string
  password: string
}

export enum OptionID{
  EMAIL = 1,
  USERNAME = 2
}
