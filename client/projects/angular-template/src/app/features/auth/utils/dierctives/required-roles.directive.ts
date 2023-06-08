import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {map, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {RoleType} from "@core";
import {authQuery} from "@auth/+data-access/store/auth.selectors";

@Directive({
	standalone: true,
	selector: '[requiredRoles]'
})
export class RequiredRolesDirective implements OnInit, OnDestroy {
	private subscription !: Subscription;
	private hasView = false; // Nueva variable
	
	constructor(private templateRef: TemplateRef<any>,
							private viewContainer: ViewContainerRef,
							private store: Store) {
	}
	
	@Input() requiredRoles: RoleType[] = [];
	
	ngOnInit() {
		this.subscription = this.store.select(authQuery.selectLoggedUser).pipe(
			map(u => u?.roles ?? [])
		)
			.subscribe(roles => {
				const roleIsPresent = this.requiredRoles.every(role => roles.includes(role));
				if (roleIsPresent && !this.hasView) { // Solo creamos la vista si no se ha creado antes
					this.viewContainer.createEmbeddedView(this.templateRef);
					this.hasView = true; // Marcamos que la vista se ha creado
				} else if (!roleIsPresent && this.hasView) {
					this.viewContainer.clear();
					this.hasView = false; // Marcamos que la vista se ha eliminado
				}
			});
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
