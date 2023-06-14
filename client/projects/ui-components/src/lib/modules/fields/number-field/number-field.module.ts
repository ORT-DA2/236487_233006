// Modules
import { NgModule } from '@angular/core';
// Prime
import { InputNumberModule } from 'primeng/inputnumber';
// Component
import {NumberFieldComponent} from "./number-field.component";
import {FieldsModule} from "../fields.module";

@NgModule({
  imports: [FieldsModule, InputNumberModule],
  declarations: [NumberFieldComponent],
  exports: [NumberFieldComponent],
})
export class NumberFieldModule {}
