import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'ago',
	standalone: true
})
export class AgoPipe implements PipeTransform {
	
	transform(value: any): string {
		const now = new Date();
		const past = new Date(value);
		const diff = Math.abs(now.getTime() - past.getTime());
		
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		
		if (days > 0) {
			return `${days} days ago`;
		} else if (hours > 0) {
			return `${hours} hours ago`;
		} else if (minutes > 0) {
			return `${minutes} minutes ago`;
		} else {
			return 'Just now';
		}
	}
	
}
