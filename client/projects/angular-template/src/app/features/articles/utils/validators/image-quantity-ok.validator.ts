import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {TemplateOption} from "@articles/utils/types/article-form";

export const CheckImageQuantityOK: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const image = group.get('image');
  const templateSelected = group.get('template');
  
  if (templateSelected && image && templateSelected.value && image.value) {
    
    if(templateSelected.value === TemplateOption.TOP_AND_BOTTOM){
     if(image.value.length < 2) return { requiredImagesMissing: true };
     if(image.value.length > 2) return { imageQuantityExceeded: true };
    }
    
    if(templateSelected.value !== TemplateOption.TOP_AND_BOTTOM) {
      if(image.value.length < 1) return { requiredImagesMissing: true };
      if(image.value.length > 1) return { imageQuantityExceeded: true };
    }
    
  }

  return null;
};
