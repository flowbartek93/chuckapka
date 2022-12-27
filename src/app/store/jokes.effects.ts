import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, of } from 'rxjs';
import { Joke } from '../models/joke.model';
import * as jokeActions from './jokes.actions';

@Injectable()
export class JokeEffects {
  constructor(private readonly actions$: Actions) {}

  $addJokeToStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jokeActions.addSingleJoke),
      map(({ joke }) => {
        const normalJoke: Joke = {
          id: joke.id,
          createdDate: joke.created_at,
          text: joke.value,
        };

        return normalJoke;
      }),
      concatMap((normalJoke) => {
        return of(jokeActions.addSingleJokeSuccess({ joke: normalJoke }));
      })
    )
  );
}
