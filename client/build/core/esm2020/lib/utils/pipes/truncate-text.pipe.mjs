import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class TruncatePipe {
    transform(value, limit = 25, completeWords = false, ellipsis = '...') {
        if (completeWords) {
            limit = value.substr(0, limit).lastIndexOf(' ');
        }
        return `${value.substr(0, limit)}${ellipsis}`;
    }
}
TruncatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TruncatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, isStandalone: true, name: "truncate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'truncate',
                    standalone: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUtdGV4dC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL3V0aWxzL3BpcGVzL3RydW5jYXRlLXRleHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFNcEQsTUFBTSxPQUFPLFlBQVk7SUFFeEIsU0FBUyxDQUFDLEtBQWEsRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLGFBQWEsR0FBRyxLQUFLLEVBQUUsUUFBUSxHQUFHLEtBQUs7UUFDM0UsSUFBSSxhQUFhLEVBQUU7WUFDbEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoRDtRQUNELE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzt5R0FQVyxZQUFZO3VHQUFaLFlBQVk7MkZBQVosWUFBWTtrQkFKeEIsSUFBSTttQkFBQztvQkFDTCxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsVUFBVSxFQUFHLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoe1xyXG5cdG5hbWU6ICd0cnVuY2F0ZScsXHJcblx0c3RhbmRhbG9uZSA6IHRydWVcclxufSlcclxuZXhwb3J0IGNsYXNzIFRydW5jYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cdFxyXG5cdHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBsaW1pdCA9IDI1LCBjb21wbGV0ZVdvcmRzID0gZmFsc2UsIGVsbGlwc2lzID0gJy4uLicpIHtcclxuXHRcdGlmIChjb21wbGV0ZVdvcmRzKSB7XHJcblx0XHRcdGxpbWl0ID0gdmFsdWUuc3Vic3RyKDAsIGxpbWl0KS5sYXN0SW5kZXhPZignICcpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGAke3ZhbHVlLnN1YnN0cigwLCBsaW1pdCl9JHtlbGxpcHNpc31gO1xyXG5cdH1cclxuXHRcclxufVxyXG5cclxuLypcclxuVGhpcyBwaXBlIHdpbGwgY3V0IG9mZiB0aGUgdGV4dCBhdCB0aGUgY2hhcmFjdGVyIGxpbWl0IHlvdSBzcGVjaWZ5LlxyXG5JZiBjb21wbGV0ZVdvcmRzIGlzIHRydWUsIGl0IHdpbGwgY3V0IG9mZiBhdCB0aGUgbGFzdCBjb21wbGV0ZSB3b3JkIGJlZm9yZSB0aGUgbGltaXQuXHJcbiBJdCB0aGVuIGFwcGVuZHMgYW4gZWxsaXBzaXMgdG8gdGhlIGVuZCAob3Igd2hhdGV2ZXIgc3RyaW5nIHlvdSBwYXNzIGZvciBlbGxpcHNpcykuXHJcblxyXG5Zb3Ugd291bGQgdGhlbiB1c2UgdGhlIHBpcGUgaW4geW91ciB0ZW1wbGF0ZSBsaWtlIHRoaXM6XHJcbnt7IHNvbWVMb25nVGV4dCB8IHRydW5jYXRlOjIwOmZhbHNlIH19XHJcbiAqL1xyXG5cclxuXHJcbiJdfQ==