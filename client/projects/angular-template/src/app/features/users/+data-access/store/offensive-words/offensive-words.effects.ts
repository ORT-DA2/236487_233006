import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, of} from 'rxjs';
import {wordsActions} from "@users/+data-access/store/offensive-words/offensive-words.actions";
import {OffensiveWordsService} from "@users/+data-access/services/offensive-words.service";
import {Store} from "@ngrx/store";

@Injectable()
export class OffensiveWordsEffects {
  
  loadOffensiveWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wordsActions.loadWords),
      concatMap((action) =>
        this.offensiveWordsService.getAll().pipe(
          map((words) =>
            wordsActions.loadWordsSuccess({words} )
          ),
          catchError((error) =>
            of(wordsActions.loadWordsFailure(error))
          )
        )
      )
    )
  );
  
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wordsActions.createWord),
      concatMap(({word}) =>
        this.offensiveWordsService.create(word).pipe(
          map((users) => wordsActions.loadWords()),
          catchError((error) =>
            of(wordsActions.createWordFailure(error))
          )
        )
      )
    )
  );
  

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(wordsActions.deleteWord),
      concatMap(({id}) =>
        this.offensiveWordsService.delete(id).pipe(
          map(response => wordsActions.loadWords())
        )
      )
    )
  )
  
  
  constructor(
    private readonly actions$: Actions,
    private readonly offensiveWordsService: OffensiveWordsService,
    private readonly store : Store
  ) {}
}
