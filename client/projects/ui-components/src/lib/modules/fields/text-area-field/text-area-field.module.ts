// Modules
import { NgModule } from '@angular/core';
import {TextAreaFieldComponent} from './text-area-field.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FieldsModule} from "../fields.module";


@NgModule({
  declarations: [TextAreaFieldComponent],
  imports: [FieldsModule, InputTextareaModule],
  exports: [TextAreaFieldComponent],
})
export class TextAreaFieldModule {}
