import { act, Actions } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { Joke } from './../models/joke.model';
import * as jokeActions from './jokes.actions';

export const jokeFeatureKey = 'Jokes';

interface jokeState {
  list: Joke[];
}

export const initialState: jokeState = {
  list: [],
};

export const jokeReducer = createReducer(
  initialState,

  on(jokeActions.addSingleJokeSuccess, (state, props) => {
    return {
      ...state,
    };
  })
);

export function reducer(state: jokeState | undefined, action: Action) {
  return jokeReducer(state, action);
}
