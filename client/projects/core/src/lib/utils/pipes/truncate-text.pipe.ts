import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'truncate',
	standalone : true
})
export class TruncatePipe implements PipeTransform {
	
	transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
		if (completeWords) {
			limit = value.substr(0, limit).lastIndexOf(' ');
		}
		return `${value.substr(0, limit)}${ellipsis}`;
	}
	
}

/*
This pipe will cut off the text at the character limit you specify.
If completeWords is true, it will cut off at the last complete word before the limit.
 It then appends an ellipsis to the end (or whatever string you pass for ellipsis).

You would then use the pipe in your template like this:
{{ someLongText | truncate:20:false }}
 */


