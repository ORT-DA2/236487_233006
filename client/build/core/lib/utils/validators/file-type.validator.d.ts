import { FormControl } from '@angular/forms';
export declare function requiredFileType(requiredType: string): (control: FormControl) => {
    requiredFileType: boolean;
} | null;
