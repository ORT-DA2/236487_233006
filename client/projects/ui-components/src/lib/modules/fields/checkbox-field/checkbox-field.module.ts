// Modules
import { NgModule } from '@angular/core';
// Prime
import { CheckboxModule } from 'primeng/checkbox';
// Component
import { CheckboxFieldComponent } from './checkbox-field.component';
import {FieldsModule} from "../fields.module";

@NgModule({
  declarations: [CheckboxFieldComponent],
  imports: [FieldsModule, CheckboxModule],
  exports: [CheckboxFieldComponent],
})
export class CheckboxFieldModule {}
