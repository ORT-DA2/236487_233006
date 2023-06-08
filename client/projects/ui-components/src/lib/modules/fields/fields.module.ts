// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [CommonModule, ReactiveFormsModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class FieldsModule {}
