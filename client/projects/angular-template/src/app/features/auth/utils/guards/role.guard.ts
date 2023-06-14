import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import {Observable} from 'rxjs'
import {map, take} from 'rxjs/operators'
import {Store} from '@ngrx/store'
import {authQuery} from '@auth/+data-access/store/auth.selectors'
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private toast : ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): Observable<boolean> {
    const requiredRoles = route.data['requiredRoles'] as number[]

    return this.store.select(authQuery.selectLoggedUser).pipe(
      map((user) => {
        const hasRole = requiredRoles.every((role: number) => user?.roles?.includes(role)) || false
        if (!hasRole) {
          this.toast.error("You are not autorized to perform this action","Not Authorized")
          this.router.navigate(['/private/articles'])
        }

        return hasRole
      }),
      take(1) // Take 1 to complete the observable after the first value is emitted.
    )
  }
}
