import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from "@angular/core";
import {map, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {authQuery} from "@auth/+data-access/store/auth.selectors";

@Directive({
	standalone: true,
	selector: '[visibleFor]'
})
export class ArticleVisibilityDirective implements OnDestroy{
	
	private hasView = false;
	private subscription!: Subscription;
	
	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef,
		private store: Store
	) { }
	
	@Input() set visibleFor(authorId: number) {
		this.subscription = this.store.select(authQuery.selectLoggedUser).pipe(
			map(u => u?.id)
		)
			.subscribe(userId => {
				if (authorId === userId && !this.hasView) {
					this.viewContainer.createEmbeddedView(this.templateRef);
					this.hasView = true;
				} else if (authorId !== userId && this.hasView) {
					this.viewContainer.clear();
					this.hasView = false;
				}
			});
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
