import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {OffensiveWord} from "@shared/domain";

@Directive({
	selector: "[highlight]",
	standalone : true
})
export class HighlightDirective implements OnInit {
	@Input() highlight : OffensiveWord[] = []
	@Input() text !: string;
	@Input() classToApply!: string;
	
	constructor(private el: ElementRef, private renderer: Renderer2) { }
	
	ngOnInit() {
		if (typeof this.classToApply === "undefined") {
			this.classToApply = "";
		}
		
		if (typeof this.highlight === "undefined") {
			this.renderer.setProperty(this.el.nativeElement, "innerHTML", this.text);
			return;
		}
		
		let newText = this.text;
		for (let i = 0; i < this.highlight.length; i++) {
			let search = escapeStringRegexp(this.highlight[i].word);
			newText = this.replace(newText, search);
		}
		this.renderer.setProperty(this.el.nativeElement, "innerHTML", newText);
	}
	
	replace(txt: string, search: string) {
		let searchRgx = new RegExp("("+search+")", "gi");
		
		return txt.replace(searchRgx, `<span class="${this.classToApply}">$1</span>`);
	}
}


let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

export function escapeStringRegexp (str : string) {
	if (typeof str !== "string") {
		throw new TypeError("Expected a string");
	}
	
	return str.replace(matchOperatorsRe, "\\$&");
};
