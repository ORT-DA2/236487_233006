// Modules
import { NgModule } from '@angular/core';
// Prime
import { InputTextModule } from 'primeng/inputtext';
// Component
import { TextFieldComponent } from './text-field.component';
import {FieldsModule} from "../fields.module";

@NgModule({
  imports: [FieldsModule, InputTextModule],
  declarations: [TextFieldComponent],
  exports: [TextFieldComponent],
})
export class TextFieldModule {}
