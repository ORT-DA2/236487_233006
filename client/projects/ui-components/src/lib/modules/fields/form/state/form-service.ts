import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class FormService {
	resetForm$ = new Subject<void>();
	formSubmitted$ = new Subject<void>();
}
