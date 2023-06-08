import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {LocalStorageService} from '@auth/+data-access/services/local-storage.service';

export const AuthGuard = () => {
  const storage = inject(LocalStorageService);
  const router = inject(Router);
  // Should I check for store or directly for token ?
  // Getting token form localStorage is a more expensive operation -.-
  return storage.getUser().pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
    take(1)
  );
};

