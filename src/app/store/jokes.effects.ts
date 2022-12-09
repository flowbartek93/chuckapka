import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, of } from 'rxjs';
import * as jokeActions from './jokes.actions';

@Injectable()
export class JokeEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<{}>
  ) {}

  $addJokeToStore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(jokeActions.addSingleJoke),
        concatMap(({ joke }) => {
          console.log(joke);

          return of(jokeActions.addSingleJokeSuccess({ joke: joke }));
        })
      )
    // { dispatch: false }
  );
}
