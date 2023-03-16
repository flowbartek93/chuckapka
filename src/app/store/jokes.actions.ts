import { createAction, props } from '@ngrx/store';
import { httpJokeResponse } from '../models/httpJokeResponse.model';
import { Joke } from '../models/joke.model';

export const addSingleJoke = createAction(
  '[joke app] adding to store',
  props<{ joke: httpJokeResponse }>()
);

export const addSingleJokeSuccess = createAction(
  '[joke app] adding to store success',
  props<{ joke: Joke }>()
);

export const modifySingleJoke = createAction(
  '[joke app] modifying to store success',
  props<{ joke: Joke }>()
);

export const modifySingleJokeSuccess = createAction(
  '[joke app] modifying to store success',
  props<{ joke: Joke }>()
);

export const test = createAction('test', props<{ joke: Joke }>());
