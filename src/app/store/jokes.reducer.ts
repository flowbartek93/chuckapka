import { EntityState } from '@ngrx/entity';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Joke } from './../models/joke.model';
import * as jokeActions from './jokes.actions';

export const jokeFeatureKey = 'Jokes';

export interface jokeState {
  list: EntityState<Joke>;
  editedJokes: EntityState<Joke>;
}

export const jokeAdapter: EntityAdapter<Joke> = createEntityAdapter({
  selectId: (joke: Joke) => {
    return joke.id;
  },
});

export const initialState: jokeState = {
  list: jokeAdapter.getInitialState(),
  editedJokes: jokeAdapter.getInitialState(),
};

export const jokeReducer = createReducer(
  initialState,

  on(jokeActions.addSingleJokeSuccess, (state, props): jokeState => {
    return {
      ...state,
      list: jokeAdapter.setOne(props.joke, state.list),
    };
  }),

  on(jokeActions.modifySingleJokeSuccess, (state, props): jokeState => {
    return {
      ...state,
      editedJokes: jokeAdapter.setOne(props.joke, state.editedJokes),
    };
  })
);

export function reducer(state: jokeState | undefined, action: Action) {
  return jokeReducer(state, action);
}
