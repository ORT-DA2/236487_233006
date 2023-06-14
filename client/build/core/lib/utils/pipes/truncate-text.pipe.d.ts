import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TruncatePipe implements PipeTransform {
    transform(value: string, limit?: number, completeWords?: boolean, ellipsis?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TruncatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TruncatePipe, "truncate", true>;
}
