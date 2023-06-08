// Modules
import { NgModule } from '@angular/core'
// Prime
import { InputNumberModule } from 'primeng/inputnumber'
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component'

import { ButtonModule } from 'primeng/button'
import { TextAreaFieldModule } from '../text-area-field'
import { NumberFieldModule } from '../number-field'
import { CheckboxFieldModule } from '../checkbox-field'
import { DateFieldModule } from '../date-field'
import { SelectFieldModule } from '../select-field'
import { TextFieldModule } from '../text-field'
import { FileUploadFieldModule } from '../file-upload-field'
import { FieldsModule } from '../fields.module'

// Component

@NgModule({
  imports: [
    FieldsModule,
    InputNumberModule,
    NumberFieldModule,
    CheckboxFieldModule,
    SelectFieldModule,
    DateFieldModule,
    TextFieldModule,
    ButtonModule,
    TextAreaFieldModule,
    FileUploadFieldModule,
  ],
  declarations: [DynamicFormComponent],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
