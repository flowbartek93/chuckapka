import { EntityState } from '@ngrx/entity';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Joke } from './../models/joke.model';
import * as jokeActions from './jokes.actions';

export const jokeFeatureKey = 'Jokes';

interface jokeState {
  list: EntityState<Joke>;
}

export const jokeAdapter: EntityAdapter<Joke> = createEntityAdapter({
  selectId: (joke: Joke) => {
    return joke.id;
  },
});

export const initialState: jokeState = {
  list: jokeAdapter.getInitialState(),
};

export const jokeReducer = createReducer(
  initialState,

  on(jokeActions.addSingleJokeSuccess, (state, props) => {
    return {
      ...state,
      list: jokeAdapter.setOne(props.joke, state.list),
    };
  })
);

export function reducer(state: jokeState | undefined, action: Action) {
  return jokeReducer(state, action);
}
