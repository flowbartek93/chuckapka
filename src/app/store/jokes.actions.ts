import { createAction, props } from '@ngrx/store';
import { httpJokeResponse } from '../models/httpJokeResponse.model';

export const load = createAction('[joke app] Load');

export const addSingleJoke = createAction(
  '[joke app] adding to store',
  props<{ joke: httpJokeResponse }>()
);
