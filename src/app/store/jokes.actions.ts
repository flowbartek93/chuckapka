import { createAction, props } from '@ngrx/store';
import { httpJokeResponse } from '../models/httpJokeResponse.model';
import { Joke } from '../models/joke.model';

export const load = createAction('[joke app] Load');

export const addSingleJoke = createAction(
  '[joke app] adding to store',
  props<{ joke: httpJokeResponse }>()
);

export const addSingleJokeSuccess = createAction(
  '[joke app] adding to store success',
  props<{ joke: Joke }>()
);